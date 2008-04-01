/* Copyright (c) 1&1. All Rights Reserved. */

package org.qooxdoo.sushi.classfile;

import java.lang.reflect.Field;

/**
 * Instruction set.
 */

public class Set implements Constants {
    public static final InstructionEncoding[] encoding = new InstructionEncoding[256];

    public static final InstructionType[] types
        = new InstructionType[256];


    private static int[] a() {
        return new int[] {};
    }
    private static int[] a(int a0) {
        return new int[] { a0 };
    }
    private static int[] a(int a0, int a1) {
        return new int[] { a0, a1 };
    }

    private static int getOpcode(String name) {
        Field f;

        try {
            f = Bytecodes.class.getField(name.toUpperCase());
        } catch (NoSuchFieldException e) {
            throw new RuntimeException("no such opcode: " + name);
        }
        try {
            return f.getInt(null);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("can read field " + name);
        }
    }

    private static InstructionType type(
        String name, int[] args, int encoding, int stackDiff, int succType)
    {
        int opcode;

        opcode = getOpcode(name);
        if (types[opcode] != null) {
            throw new RuntimeException("duplicate type: " + opcode);
        }
        types[opcode] =
            new InstructionType(name, opcode, args,
                                encoding, stackDiff, succType);
        return types[opcode];
    }

    private static void enc(String name, int[] args, InstructionType type) {
        int opcode;

        opcode = getOpcode(name);
        if (encoding[opcode] != null) {
            throw new RuntimeException("duplicate encoding: " + opcode);
        }
        encoding[opcode] = new InstructionEncoding(name, opcode, args, type);
    }

    private static void generic(int encoding,
        String name, int[] typeArgs, int[] encArgs, int stackDiff,
        int succType)
    {
        InstructionType type;

        type = type(name, typeArgs, encoding, stackDiff, succType);
        enc(name, encArgs, type);
    }

    private static void simple(String name, int[] args, int stackDiff,
                               int succType) {
        int i;
        int[] encodedArgs;

        encodedArgs = new int[args.length];
        for (i = 0; i < args.length; i++) {
            switch (args[i]) {
            case REFTYPEREF:
                encodedArgs[i] = AE_REFTYPEREF;
                break;
            case FIELDREF:
                encodedArgs[i] = AE_FIELDREF;
                break;
            case IFMETHOD:
                encodedArgs[i] = AE_IFMETHOD;
                break;
            case METHODREF:
                encodedArgs[i] = AE_METHODREF;
                break;
            case BYTE:
            case TYPE_BYTE:
                encodedArgs[i] = AE_U1;
                break;
            default:
                throw new IllegalArgumentException(
                    name + "[" + i + "]: " + args[i]);
            }
        }
        generic(SIMPLE, name, args, encodedArgs, stackDiff, succType);
    }

    private static void lv(String name, int stackDiff) {
        InstructionType type;
        String name_0;
        String name_1;
        String name_2;
        String name_3;
        int[] args;

        name_0 = name + "_0";
        name_1 = name + "_1";
        name_2 = name + "_2";
        name_3 = name + "_3";
        args = new int[] {
            getOpcode(name_0), getOpcode(name_1),
            getOpcode(name_2), getOpcode(name_3)
        };
        type = type(name, args, LV, stackDiff, SUCC_NEXT);
        enc(name, new int[] { AE_U1 }, type);
        enc(name_0, new int[] { AE_I_I0 }, type);
        enc(name_1, new int[] { AE_I_I1 }, type);
        enc(name_2, new int[] { AE_I_I2 }, type);
        enc(name_3, new int[] { AE_I_I3 }, type);
        // "wide" is hard-wired into InstructionEncoding
    }

    private static void branch(
        String name, String notName, int stackDiff, int succType)
    {
        InstructionType type;

        type = type(name, new int[] { getOpcode(notName) },
                    BRANCH, stackDiff, succType);
        enc(name, new int[] { AE_S2 }, type);
    }

    private static void vbranch(String name, int stackDiff, int succType) {
        InstructionType type;
        String nameW;

        nameW = name + "_w";
        type = type(name, new int[] { getOpcode(nameW) },
                   VBRANCH, stackDiff, succType);
        enc(name, new int[] { AE_S2 }, type);
        enc(nameW, new int[] { AE_U4 }, type);
    }

    private static void cnst(String name) {
        InstructionType t;

        t = type(name, new int[] {}, CNST, LDC_STACK, SUCC_NEXT);
        enc("aconst_null", a(AE_I_NULL),  t);
        enc("iconst_m1",   a(AE_I_Im1),   t);
        enc("iconst_0",    a(AE_I_I0),    t);
        enc("iconst_1",    a(AE_I_I1),    t);
        enc("iconst_2",    a(AE_I_I2),    t);
        enc("iconst_3",    a(AE_I_I3),    t);
        enc("iconst_4",    a(AE_I_I4),    t);
        enc("iconst_5",    a(AE_I_I5),    t);
        enc("lconst_0",    a(AE_I_L0),    t);
        enc("lconst_1",    a(AE_I_L1),    t);
        enc("fconst_0",    a(AE_I_F0),    t);
        enc("fconst_1",    a(AE_I_F1),    t);
        enc("fconst_2",    a(AE_I_F2),    t);
        enc("dconst_0",    a(AE_I_D0),    t);
        enc("dconst_1",    a(AE_I_D1),    t);
        enc("bipush",      a(AE_S1),      t);
        enc("sipush",      a(AE_S2),      t);
        enc("ldc",         a(AE_CNST),    t);
        enc("ldc_w",       a(AE_CNST_W),  t);
        enc("ldc2_w",      a(AE_CNST2_W), t);
    }

    static {
        enc("wide", new int[] {}, null);

        simple( "nop",            a(), 0, SUCC_NEXT);
        cnst(   "ldc"             );
        lv(     "iload",          1);
        lv(     "lload",          2);
        lv(     "fload",          1);
        lv(     "dload",          2);
        lv(     "aload",          1);

    // wide is hard-wired:
    generic(RT, "ret",            a(), a(AE_U1), 0, SUCC_RET);

        simple( "iaload",         a(), -1, SUCC_NEXT);
        simple( "laload",         a(), 0, SUCC_NEXT);
        simple( "faload",         a(), -1, SUCC_NEXT);
        simple( "daload",         a(), 0, SUCC_NEXT);
        simple( "aaload",         a(), -1, SUCC_NEXT);
        simple( "baload",         a(), -1, SUCC_NEXT);
        simple( "caload",         a(), -1, SUCC_NEXT);
        simple( "saload",         a(), -1, SUCC_NEXT);
        lv(     "istore",         -1);
        lv(     "lstore",         -2);
        lv(     "fstore",         -1);
        lv(     "dstore",         -2);
        lv(     "astore",         -1);
        simple( "iastore",        a(), -3, SUCC_NEXT);
        simple( "lastore",        a(), -4, SUCC_NEXT);
        simple( "fastore",        a(), -3, SUCC_NEXT);
        simple( "dastore",        a(), -4, SUCC_NEXT);
        simple( "aastore",        a(), -3, SUCC_NEXT);
        simple( "bastore",        a(), -3, SUCC_NEXT);
        simple( "castore",        a(), -3, SUCC_NEXT);
        simple( "sastore",        a(), -3, SUCC_NEXT);
        simple( "pop",            a(), -1, SUCC_NEXT);
        simple( "pop2",           a(), -2, SUCC_NEXT);
        simple( "dup",            a(), 1, SUCC_NEXT);
        simple( "dup_x1",         a(), 1, SUCC_NEXT);
        simple( "dup_x2",         a(), 1, SUCC_NEXT);
        simple( "dup2",           a(), 2, SUCC_NEXT);
        simple( "dup2_x1",        a(), 2, SUCC_NEXT);
        simple( "dup2_x2",        a(), 2, SUCC_NEXT);
        simple( "swap",           a(), 0, SUCC_NEXT);
        simple( "iadd",           a(), -1, SUCC_NEXT);
        simple( "ladd",           a(), -2, SUCC_NEXT);
        simple( "fadd",           a(), -1, SUCC_NEXT);
        simple( "dadd",           a(), -2, SUCC_NEXT);
        simple( "isub",           a(), -1, SUCC_NEXT);
        simple( "lsub",           a(), -2, SUCC_NEXT);
        simple( "fsub",           a(), -1, SUCC_NEXT);
        simple( "dsub",           a(), -2, SUCC_NEXT);
        simple( "imul",           a(), -1, SUCC_NEXT);
        simple( "lmul",           a(), -2, SUCC_NEXT);
        simple( "fmul",           a(), -1, SUCC_NEXT);
        simple( "dmul",           a(), -2, SUCC_NEXT);
        simple( "idiv",           a(), -1, SUCC_NEXT);
        simple( "ldiv",           a(), -2, SUCC_NEXT);
        simple( "fdiv",           a(), -1, SUCC_NEXT);
        simple( "ddiv",           a(), -2, SUCC_NEXT);
        simple( "irem",           a(), -1, SUCC_NEXT);
        simple( "lrem",           a(), -2, SUCC_NEXT);
        simple( "frem",           a(), -1, SUCC_NEXT);
        simple( "drem",           a(), -2, SUCC_NEXT);
        simple( "ineg",           a(), 0, SUCC_NEXT);
        simple( "lneg",           a(), 0, SUCC_NEXT);
        simple( "fneg",           a(), 0, SUCC_NEXT);
        simple( "dneg",           a(), 0, SUCC_NEXT);
        simple( "ishl",           a(), -1, SUCC_NEXT);
        simple( "lshl",           a(), -1, SUCC_NEXT);
        simple( "ishr",           a(), -1, SUCC_NEXT);
        simple( "lshr",           a(), -1, SUCC_NEXT);
        simple( "iushr",          a(), -1, SUCC_NEXT);
        simple( "lushr",          a(), -1, SUCC_NEXT);
        simple( "iand",           a(), -1, SUCC_NEXT);
        simple( "land",           a(), -2, SUCC_NEXT);
        simple( "ior",            a(), -1, SUCC_NEXT);
        simple( "lor",            a(), -2, SUCC_NEXT);
        simple( "ixor",           a(), -1, SUCC_NEXT);
        simple( "lxor",           a(), -2, SUCC_NEXT);
   generic(INC, "iinc",           a(), a(AE_U1, AE_S1), 0, SUCC_NEXT);
        simple( "i2l",            a(), 1, SUCC_NEXT);
        simple( "i2f",            a(), 0, SUCC_NEXT);
        simple( "i2d",            a(), 1, SUCC_NEXT);
        simple( "l2i",            a(), -1, SUCC_NEXT);
        simple( "l2f",            a(), -1, SUCC_NEXT);
        simple( "l2d",            a(), 0, SUCC_NEXT);
        simple( "f2i",            a(), 0, SUCC_NEXT);
        simple( "f2l",            a(), 1, SUCC_NEXT);
        simple( "f2d",            a(), 1, SUCC_NEXT);
        simple( "d2i",            a(), -1, SUCC_NEXT);
        simple( "d2l",            a(), 0, SUCC_NEXT);
        simple( "d2f",            a(), -1, SUCC_NEXT);
        simple( "i2b",            a(), 0, SUCC_NEXT);
        simple( "i2c",            a(), 0, SUCC_NEXT);
        simple( "i2s",            a(), 0, SUCC_NEXT);
        simple( "lcmp",           a(), -3, SUCC_NEXT);
        simple( "fcmpl",          a(), -1, SUCC_NEXT);
        simple( "fcmpg",          a(), -1, SUCC_NEXT);
        simple( "dcmpl",          a(), -3, SUCC_NEXT);
        simple( "dcmpg",          a(), -3, SUCC_NEXT);
        branch( "ifeq", "ifne",   -1, SUCC_BRANCH);
        branch( "ifne", "ifeq",   -1, SUCC_BRANCH);
        branch( "iflt", "ifge",   -1, SUCC_BRANCH);
        branch( "ifge", "iflt",   -1, SUCC_BRANCH);
        branch( "ifgt", "ifle",   -1, SUCC_BRANCH);
        branch( "ifle", "ifgt",   -1, SUCC_BRANCH);
        branch( "if_icmpeq", "if_icmpne",  -2, SUCC_BRANCH);
        branch( "if_icmpne", "if_icmpeq",  -2, SUCC_BRANCH);
        branch( "if_icmplt", "if_icmpge",  -2, SUCC_BRANCH);
        branch( "if_icmpge", "if_icmplt",  -2, SUCC_BRANCH);
        branch( "if_icmpgt", "if_icmple",  -2, SUCC_BRANCH);
        branch( "if_icmple", "if_icmpgt",  -2, SUCC_BRANCH);
        branch( "if_acmpeq", "if_acmpne",  -2, SUCC_BRANCH);
        branch( "if_acmpne", "if_acmpeq",  -2, SUCC_BRANCH);
        vbranch("goto",           0, SUCC_GOTO);
        vbranch("jsr",            1, SUCC_JSR);
    generic(TS, "tableswitch",    a(), a(), -1, SUCC_TABLESWITCH);
    generic(LS, "lookupswitch",   a(), a(), -1, SUCC_LOOKUPSWITCH);
        simple( "ireturn",        a(), -1, SUCC_NONE);
        simple( "lreturn",        a(), -2, SUCC_NONE);
        simple( "freturn",        a(), -1, SUCC_NONE);
        simple( "dreturn",        a(), -2, SUCC_NONE);
        simple( "areturn",        a(), -1, SUCC_NONE);
        simple( "return",         a(), 0, SUCC_NONE);
        simple( "getstatic",      a(FIELDREF), GETSTATIC_STACK, SUCC_NEXT);
        simple( "putstatic",      a(FIELDREF), PUTSTATIC_STACK, SUCC_NEXT);
        simple( "getfield",       a(FIELDREF), GETFIELD_STACK, SUCC_NEXT);
        simple( "putfield",       a(FIELDREF), PUTFIELD_STACK, SUCC_NEXT);
        simple( "invokevirtual",  a(METHODREF), INVOKEVIRTUAL_STACK,
                                                SUCC_NEXT);
        simple( "invokespecial",  a(METHODREF), INVOKESPECIAL_STACK,
                                                SUCC_NEXT);
        simple( "invokestatic",   a(METHODREF), INVOKESTATIC_STACK,
                                                SUCC_NEXT);
        simple( "invokeinterface",a(IFMETHOD), INVOKEINTERFACE_STACK,
                                                SUCC_NEXT);
        simple( "new",            a(REFTYPEREF), 1, SUCC_NEXT);
        simple( "newarray",       a(TYPE_BYTE), 0, SUCC_NEXT);
        simple( "anewarray",      a(REFTYPEREF), 0, SUCC_NEXT);
        simple( "arraylength",    a(), 0, SUCC_NEXT);
        simple( "athrow",         a(), 0, SUCC_NONE);
        simple( "checkcast",      a(REFTYPEREF), 0, SUCC_NEXT);
        simple( "instanceof",     a(REFTYPEREF), 0, SUCC_NEXT);
        simple( "monitorenter",   a(), -1, SUCC_NEXT);
        simple( "monitorexit",    a(), -1, SUCC_NEXT);
        simple( "multianewarray", a(REFTYPEREF, BYTE), MULTIARRAY_STACK,
                                                       SUCC_NEXT);
        branch( "ifnull",    "ifnonnull",  -1, SUCC_BRANCH);
        branch( "ifnonnull", "ifnull",     -1, SUCC_BRANCH);
    }
}
