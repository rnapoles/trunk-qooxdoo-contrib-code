// §{header}:
// 
// This is file src/de/mlhartme/mork/classfile/Instruction.java,
// Mork version 0.5  Copyright © 1998-2002  Michael Hartmeier
// 
// Mork is licensed under the terms of the GNU Lesser General Public License.
// It is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the file license.txt for details.
// 
// §.

package de.mlhartme.mork.classfile;

import java.io.IOException;
import java.util.List;

import org.qooxdoo.sushi.util.IntArrayList;
import org.qooxdoo.sushi.util.IntCollection;

/**
 * Stupid data container.
 */
public class Instruction implements Constants {
    /**
     * Reserved for use when reading and writing instructions.
     */
    public int ofs;
    public InstructionType type;
    public Object[] arguments;

    public Instruction(
        int ofsInit, InstructionType typeInit, Object[] argumentsInit)
    {
        ofs = ofsInit;
        type = typeInit;
        arguments = argumentsInit;

        // TODO: this is expensive, but good for initial testing
        //  move into Code.emit some day
        type.checkArgs(arguments);
    }

    public int getMaxLength(Output dest) {
        return type.getMaxLength(dest, arguments);
    }

    public static Instruction read(Input src) throws IOException {
        int opcode;
        int tmp;
        InstructionEncoding encoding;

        tmp = src.getOfs();
        opcode = src.readU1();
        encoding = Set.encoding[opcode];
        if (encoding == null) {
            throw new RuntimeException("illegal opcode: " + opcode);
        } else {
            return encoding.read(src, tmp);
        }
    }

    public void write(Output dest) throws IOException {
        type.write(dest, arguments);
    }

    public void ofsToIdx(Code context) {
        type.ofsToIdx(context, ofs, arguments);
    }

    public int getVariableLength(Code context) {
        return type.getVariableLength(context, ofs, arguments);
    }

    /**
     * @param code used to resolve labels
     */
    public void getSuccessors(List jsrs,
                              int idx, Code code, IntCollection result) {
        int i;
        IntArrayList tmp;
        int max;

        switch (type.succType) {
        case SUCC_NONE:
            break; // no successor
        case SUCC_NEXT:
            result.add(idx + 1);
            break;
        case SUCC_GOTO:
            result.add(code.resolveLabel(((Integer)
                                          arguments[0]).intValue()));
            break;
        case SUCC_BRANCH:
            result.add(idx + 1);
            result.add(code.resolveLabel(((Integer)
                                          arguments[0]).intValue()));
            break;
        case SUCC_LOOKUPSWITCH:
            result.add(code.resolveLabel(((Integer)
                                          arguments[0]).intValue()));
            tmp = (IntArrayList) arguments[2];
            max = tmp.size();
            for (i = 0; i < max; i++) {
                result.add(code.resolveLabel(tmp.get(i)));
            }
            break;
        case SUCC_TABLESWITCH:
            result.add(code.resolveLabel(((Integer)
                                          arguments[0]).intValue()));
            tmp = (IntArrayList) arguments[3];
            max = tmp.size();
            for (i = 0; i < max; i++) {
                result.add(code.resolveLabel(tmp.get(i)));
            }
            break;
        case SUCC_JSR:
            result.add(code.resolveLabel(((Integer)
                                          arguments[0]).intValue()));
            break;
        case SUCC_RET:
            Jsr.addRetSuccessors(jsrs, idx, result);
            break;
        default:
            throw new RuntimeException("successor not supported: " +
                                       type.succType);
        }
    }

    public int getStackDiff() {
        MethodRef m;
        Object obj;

        switch (type.stackDiff) {
        case MULTIARRAY_STACK:
            return -((Integer) arguments[1]).intValue() + 1;
        case INVOKEVIRTUAL_STACK:
            m = (MethodRef) arguments[0];
            return -1 - m.argSize() + m.returnType.operandSize();
        case INVOKESPECIAL_STACK:
            m = (MethodRef) arguments[0];
            return -1 - m.argSize() + m.returnType.operandSize();
        case INVOKESTATIC_STACK:
            m = (MethodRef) arguments[0];
            return - m.argSize() + m.returnType.operandSize();
        case INVOKEINTERFACE_STACK:
            m = (MethodRef) arguments[0];
            return -1 - m.argSize() + m.returnType.operandSize();
        case GETSTATIC_STACK:
            return ((FieldRef) arguments[0]).type.operandSize();
        case PUTSTATIC_STACK:
            return -((FieldRef) arguments[0]).type.operandSize();
        case GETFIELD_STACK:
            return -1 + ((FieldRef) arguments[0]).type.operandSize();
        case PUTFIELD_STACK:
            return -1 - ((FieldRef) arguments[0]).type.operandSize();
        case LDC_STACK:
            obj = arguments[0];
            if (obj == null) {
                return 1;
            } else if (obj instanceof Integer) {
                return 1;
            } else if (obj instanceof Float) {
                return 1;
            } else if (obj instanceof Long) {
                return 2;
            } else if (obj instanceof Double) {
                return 2;
            } else if (obj instanceof String) {
                return 1;
            } else {
                throw new RuntimeException("LDC: " + obj);
            }
        default:
            if (type.stackDiff >= ERROR_STACK) {
                throw new RuntimeException("illegal stackDiff: "
                                           + type.stackDiff);
            }
            return type.stackDiff;
        }
    }


    public String toString() {
        StringBuffer result;
        int i;
        int[] ints;

        result = new StringBuffer();
        result.append(type.name);
        for (i = 0; i < arguments.length; i++) {
            result.append(' ');
            result.append("" + arguments[i]);  // arg might be null
        }
        return result.toString();
    }
}
