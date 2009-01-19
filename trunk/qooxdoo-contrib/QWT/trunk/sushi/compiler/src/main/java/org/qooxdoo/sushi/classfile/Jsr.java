/* ************************************************************************
   
   qooxdoo - the new era of web development
   
   http://qooxdoo.org
   
   Copyright:
     2006-2008 1&1 Internet AG, Germany, http://www.1and1.org
   
   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.
   
   Authors:
     * Michael Hartmeier (mlhartme)
   
 ************************************************************************ */

package org.qooxdoo.sushi.classfile;

import java.util.ArrayList;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;
import org.qooxdoo.sushi.util.IntBitSet;
import org.qooxdoo.sushi.util.IntCollection;

/**
 * A jsr/ret subroutine. Used to compute the instructions that can
 * follow a ret instruction.
 */

public class Jsr implements Bytecodes {
    /**
     * Start idx. Never a label.
     */
    public final int start;

    /**
     * Caller indexes. Never a label
     */
    public final IntArrayList caller;

    /**
     * Return indexes. Never a label
     */
    public final IntArrayList rets;

    public Jsr(int startInit, Code code) {
        if (startInit < 0) {
            throw new IllegalArgumentException("start < 0: " + startInit);
        }

        start = startInit;
        caller = new IntArrayList();
        rets = new IntArrayList();
        calcRets(code);
    }

    private void calcRets(Code code) {
        IntBitSet todo;
        IntBitSet reached;
        int idx;
        Instruction instr;
        List<?> empty;

        empty = new ArrayList<Object>();
        todo = new IntBitSet();
        todo.add(start);
        reached = new IntBitSet();
        while (true) {
            idx = todo.first();
            if (idx == -1) {
                break;
            }
            todo.remove(idx);
            if (!reached.contains(idx)) {
                reached.add(idx);
                instr = code.instructions.get(idx);
                instr.getSuccessors(empty, idx, code, todo);
            }
        }
        for (idx = reached.first(); idx != -1; idx = reached.next(idx)) {
            instr = code.instructions.get(idx);
            if (instr.type.opcode == RET) {
                rets.add(idx);
            }
        }
    }

    @Override
    public String toString() {
        StringBuilder result;

        result = new StringBuilder();
        result.append("jsr " + start);
        result.append(" rets: " + rets);
        result.append(" caller: " + caller);
        return result.toString();
    }

    //-----------------------------------------------------------------

    public static List<Jsr> findJsrs(Code code) {
        List<Jsr> result;
        int idx;
        int max;
        Instruction instr;
        Jsr jsr;
        int start;

        result = new ArrayList<Jsr>();
        max = code.instructions.size();
        for (idx = 0; idx < max; idx++) {
            instr = (Instruction) code.instructions.get(idx);
            if (instr.type.opcode == JSR) {
                start = code.resolveLabel(((Integer)
                                           instr.arguments[0]).intValue());
                jsr = findJsr(result, start);
                if (jsr == null) {
                    jsr = new Jsr(start, code);
                    result.add(jsr);
                }
                jsr.caller.add(idx);
            }
        }
        return result;
    }

    public static Jsr findJsr(List<Jsr> jsrs, int st) {
        Jsr result;
        int i, max;

        max = jsrs.size();
        for (i = 0; i < max; i++) {
            result = (Jsr) jsrs.get(i);
            if (result.start == st) {
                return result;
            }
        }
        return null;
    }

    /**
     * idx  index of ret
     */
    public static void addRetSuccessors(List<Jsr> jsrs, int idx, IntCollection result) {
        int i, max;

        max = jsrs.size();
        for (i = 0; i < max; i++) {
            ((Jsr) jsrs.get(i)).addRetSuccessors(idx, result);
        }
    }

    public void addRetSuccessors(int idx, IntCollection result) {
        int i, max;

        if (rets.indexOf(idx) != -1) {
            max = caller.size();
            for (i = 0; i < max; i++) {
                result.add(caller.get(i) + 1);
            }
        }
    }
}
