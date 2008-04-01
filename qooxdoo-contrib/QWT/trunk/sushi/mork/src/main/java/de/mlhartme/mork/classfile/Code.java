// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Code.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import de.mlhartme.mork.util.IntBitSet;
import de.mlhartme.mork.util.IntArrayList;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Code extends Attribute implements Constants {
    public int locals;

    /** List ofs Instructions */
    public List instrs;

    /** List of ExceptionInfos */
    public List exceptions;

    /** List of Attributes */
    public List attributes;

    /** only valid while reading or writing. */
    private int codeSize;

    /**
     * Labels to have forware references:
     * Index i stores label -i; index 0 is not used
     *  -1: declared, but not defined
     *  otherwise: index
     */
    private IntArrayList labels;

    public Code() {
        super("Code");

        locals = 0;
        instrs = new ArrayList();
        exceptions = new ArrayList();
        attributes = new ArrayList();
        labels = new IntArrayList();
        labels.add(0); // dummy
    }

    public Code(Input src) throws IOException {
        this();

        Instruction instr;
        int i;
        int max;
        int loadedStack;
        int computedStack;

        src.readU4(); // attribute length is not used

        loadedStack = src.readU2();
        locals = src.readU2();
        max = src.readU4();
        src.openCode(this);
        while (src.getOfs() < max) {
            instr = Instruction.read(src);
            instrs.add(instr);
        }
        codeSize = src.getOfs();
        max = instrs.size();
        for (i = 0; i < max; i++) {
            instr = (Instruction) instrs.get(i);
            instr.ofsToIdx(this);
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            exceptions.add(new ExceptionInfo(src));
        }
        max = src.readU2();
        for (i = 0; i < max; i++) {
            attributes.add(Attribute.create(src));
        }
        src.closeCode();

        computedStack = calcStackSize();
        if (loadedStack < computedStack) {
            System.out.println(
                "warning: loaded stack size differs from computed: " +
                "loaded: " + loadedStack + " < computed: " + computedStack);
        }
    }

    /**
     * @return number of instructions.
     */
    public int getSize() {
        return instrs.size();
    }

    public void write(Output dest) throws IOException {
        int i, max;
        Instruction instr;
        ExceptionInfo info;
        Attribute attr;
        int start;

        layout(dest);
        if (codeSize > 0xffff) {
            throw new IllegalStateException("code segment exceeds 64k");
        }
        dest.writeUtf8(name);
        start = dest.writeSpace(4);
        dest.writeU2(calcStackSize());
        dest.writeU2(locals);
        dest.writeU4(codeSize);
        dest.openCode(this);
        max = instrs.size();
        for (i = 0; i < max; i++) {
            instr = (Instruction) instrs.get(i);
            instr.write(dest);
        }
        max = exceptions.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            info = (ExceptionInfo) exceptions.get(i);
            info.write(dest);
        }
        max = attributes.size();
        dest.writeU2(max);
        for (i = 0; i < max; i++) {
            attr = (Attribute) attributes.get(i);
            attr.write(dest);
        }
        dest.closeCode();
        dest.writeFixup(start, dest.getGlobalOfs() - (start + 4));
    }

    /** compute ofs for all instructions. */
    private void layout(Output dest) {
        Instruction instr;
        int instrSize, varSize;
        IntArrayList vars;  // indexes of instructions with variable length
        IntArrayList lens;  // lengths of var-len instructions
        int i, j, k, ofs;
        int shrink, len;
        boolean changes;

        instrSize = instrs.size();
        vars = new IntArrayList();
        lens = new IntArrayList();
        ofs = 0;
        for (i = 0; i < instrSize; i++) {
            instr = (Instruction) instrs.get(i);
            instr.ofs = ofs;
            len = instr.getMaxLength(dest);
            ofs += len;
            if (instr.type.isVariable()) {
                vars.add(i);
                lens.add(len);
            }
        }
        codeSize = ofs;
        varSize = vars.size();
        do {
            changes = false;
            shrink = 0;
            for (i = 0; i < varSize; i++) {
                j = vars.get(i);
                instr = (Instruction) instrs.get(j);
                len = instr.getVariableLength(this);
                if (len < lens.get(i)) {
                    changes = true;
                    shrink += (lens.get(i) - len);
                    lens.set(i, len);
                }
                if (shrink > 0) {
                    // relocate up to end or next var-instr
                    for (k = (i + 1 == varSize)? instrSize - 1 : vars.get(i + 1);  k > j; k--) {
                        ((Instruction) instrs.get(k)).ofs -= shrink;
                    }
                }
            }
            codeSize -= shrink;
        } while (changes);
    }

    //---------------------------------------------------------------------
    // code context

    public int findEndIdxOrLast(int startIdx, int len) {
        return findIdxOrLast(((Instruction) instrs.get(startIdx)).ofs + len);
    }

    public int findIdxOrLast(int ofs) {
        if (ofs == codeSize) {
            return instrs.size();
        } else {
            return findIdx(ofs);
        }
    }

    public int findIdx(int ofs) {
        // binary search
        int low, high;
        int idx;
        int tmp;

        low = 0;
        high = instrs.size() - 1;

        while (low <= high) {
            idx = (low + high) / 2;
            tmp = ((Instruction) instrs.get(idx)).ofs;
            if (tmp < ofs) {
                low = idx + 1;
            } else if (tmp > ofs) {
                high = idx - 1;
            } else {
                return idx;
            }
        }
        throw new RuntimeException("no such ofs: " + ofs);
    }

    public int findEndOfsOrLast(int startIdx, int idx) {
        return findOfsOrLast(idx) - findOfs(startIdx);
    }

    public int findOfsOrLast(int idx) {
        if (idx == instrs.size()) {
            return codeSize;
        } else {
            return findOfs(idx);
        }
    }

    public int findOfs(int idx) {
        return ((Instruction) instrs.get(resolveLabel(idx))).ofs;
    }

    //-----------------------------------------------------------------
    // Labels are argument to goto and if..
    // a forward reference is first declared and then defined

    public int resolveLabel(int idx) {
        int trueIdx;

        if (idx < 0) {
            trueIdx = labels.get(-idx);
            if (trueIdx < 0) {
                throw new RuntimeException("undefined label: " + idx);
            }
            return trueIdx;
        } else {
            return idx;
        }
    }

    public int declareLabel() {
        labels.add(-1);
        return -(labels.size() - 1);
    }

    public void defineLabel(int label) {
        if (labels.get(-label) != -1) {
            throw new RuntimeException("duplicate definition for label " + label);
        }
        labels.set(-label, instrs.size());
    }

    public int currentLabel() {
        return instrs.size();
    }

    //-----------------------------------------------------------------

    public String toString() {
        StringBuffer result;
        int i;
        Instruction instr;

        result = new StringBuffer();
        result.append("Code attribute: \n");
        result.append("    locals=" + locals);
        result.append("    codeSize=" + codeSize + "\n");
        for (i = 0; i < instrs.size(); i++) {
            instr = (Instruction) instrs.get(i);
            result.append(i + "\t" + "(" + instr.ofs + ")\t" +
                          instr.toString() + "\n");
        }
        for (i = 0; i < exceptions.size(); i++) {
            result.append('\t');
            result.append(exceptions.get(i).toString());
            result.append('\n');
        }
        for (i = 0; i < attributes.size(); i++) {
            result.append('\t');
            result.append(attributes.get(i).toString());
            result.append('\n');
        }
        return result.toString();
    }

    //------------------------------------------------------------------

    /** pc is increased by 1. */
    public void emitGeneric(int opcode, Object[] args) {
        Instruction instr;
        InstructionType type;

        type = Set.types[opcode];
        instr = new Instruction(-1, type, args);
        instrs.add(instr);
    }

    public void emit(int opcode) {
        emitGeneric(opcode, new Object[] {});
    }
    public void emit(int opcode, int arg) {
        emitGeneric(opcode, new Object[] { new Integer(arg) });
    }
    public void emit(int opcode, int arg0, int arg1) {
        emitGeneric(opcode, new Object[] { new Integer(arg0), new Integer(arg1) });
    }

    public void emit(int opcode, String arg) {
        emitGeneric(opcode, new Object[] { arg });
    }

    public void emit(int opcode, MethodRef arg) {
        emitGeneric(opcode, new Object[] { arg });
    }

    public void emit(int opcode, ClassRef arg) {
        emitGeneric(opcode, new Object[] { arg });
    }

    public void emit(int opcode, FieldRef arg) {
        emitGeneric(opcode, new Object[] { arg });
    }

    public void emit(int opcode, int a, int b, int c, IntArrayList d) {
        emitGeneric(opcode, new Object[] { new Integer(a), new Integer(b), new Integer(c), d });
    }

    public void emit(int opcode, int a, IntArrayList b, IntArrayList c) {
        emitGeneric(opcode, new Object[] { new Integer(a), b, c });
    }

    //------------------------------------------------------------------------------

    // similar to emit(), but with PC specified
    public int declareFixup() {
        int result;

        result = instrs.size();
        emit(Bytecodes.NOP);
        return result;
    }

    public void fixupGeneric(int fixup, int opcode, Object[] args) {
        Instruction instr;
        InstructionType type;

        type = Set.types[opcode];
        instr = new Instruction(-1, type, args);
        instrs.set(fixup, instr);
    }

    public void fixup(int fixup, int opcode) {
        fixupGeneric(fixup, opcode, new Object[] {});
    }
    public void fixup(int fixup, int opcode, int arg) {
        fixupGeneric(fixup, opcode, new Object[] { new Integer(arg) });
    }
    public void fixup(int fixup, int opcode, int arg0, int arg1) {
        fixupGeneric(fixup, opcode, new Object[] { new Integer(arg0), new Integer(arg1) });
    }

    public void fixup(int fixup, int opcode, String arg) {
        fixupGeneric(fixup, opcode, new Object[] { arg });
    }

    public void fixup(int fixup, int opcode, MethodRef arg) {
        fixupGeneric(fixup, opcode, new Object[] { arg });
    }

    public void fixup(int fixup, int opcode, ClassRef arg) {
        fixupGeneric(fixup, opcode, new Object[] { arg });
    }

    public void fixup(int fixup, int opcode, FieldRef arg) {
        fixupGeneric(fixup, opcode, new Object[] { arg });
    }

    public void fixup(int fixup, int opcode, int a, int b, int c, IntArrayList d) {
        fixupGeneric(fixup, opcode, new Object[] {
            new Integer(a), new Integer(b), new Integer(c), d });
    }

    public void fixup(int fixup, int opcode, int a, IntArrayList b, IntArrayList c) {
        fixupGeneric(fixup, opcode, new Object[] { new Integer(a), b, c });
    }


    //-------------------------------------------------------------------

    // computed the stack size
    private int calcStackSize() {
        int i, max;
        int result;
        int current;
        int[] startStack;
        ExceptionInfo e;
        int tmp;
        int unreachable;
        IntBitSet todo;
        List jsrs;
        String str;

        jsrs = Jsr.findJsrs(this);
        startStack = new int[instrs.size()];
        for (i = 0; i < startStack.length; i++) {
            startStack[i] = -1;
        }
        startStack[0] = 0;
        todo = new IntBitSet();
        todo.add(0);
        max = exceptions.size();
        for (i = 0; i < max; i++) {
            e = (ExceptionInfo) exceptions.get(i);
            startStack[e.handler] = 1;
            todo.add(e.handler);
        }

        fillStack(jsrs, todo, startStack);

        result = 0;
        unreachable = -1;
        for (i = 0; i < startStack.length; i++) {
            tmp = startStack[i];
            if (tmp > result) {
                result = tmp;
            }
            if ((unreachable == -1) && (tmp == -1)) {
                unreachable = i;
            }
        }
        if (unreachable != -1) {
            // TODO:

            // There are several class file in Sun JDK 1.3 with dead
            // code, and they pass class file validation:
            // (e.g. com.sun.corba.se.intneral.io.util.Arrays)

            str = "unreachable code, starting " + unreachable + "\n";
            System.out.println("warning: " + str);
        }
        return result;
    }

    private void fillStack(List jsrs, IntBitSet todo, int[] startStack) {
        int succSize;
        Instruction instr;
        int idx;
        int i, max;
        int tmp, succIdx;
        IntArrayList succBuffer;

        while (true) {
            idx = todo.first();
            if (idx == -1) {
                return;
            }
            todo.remove(idx);

            instr = (Instruction) instrs.get(idx);
            succSize = startStack[idx] + instr.getStackDiff();
            if (succSize < 0) {
                throw new RuntimeException("stack size <0, idx: " + idx);
            }
            succBuffer = new IntArrayList();
            instr.getSuccessors(jsrs, idx, this, succBuffer);
            max = succBuffer.size();
            for (i = 0; i < max; i++) {
                succIdx = succBuffer.get(i);
                tmp = startStack[succIdx];
                if (tmp == succSize) {
                    // do nothing, end of recursion
                } else if (tmp == -1) {
                    startStack[succIdx] = succSize;
                    todo.add(succIdx);
                } else {
                    throw new RuntimeException("wrong stack idx = " + succIdx
                                               + ": " + tmp + "!=" + succSize + "\n" + toString());
                }
            }
        }
    }

    //--------------------
    // TODO

    public int allocate(ClassRef cl) {
        int result;

        result = locals;
        locals += cl.operandSize();
        return result;
    }
}
