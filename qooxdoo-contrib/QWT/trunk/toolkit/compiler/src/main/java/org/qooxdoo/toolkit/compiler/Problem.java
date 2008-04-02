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

package org.qooxdoo.toolkit.compiler;

import java.util.ArrayList;
import java.util.List;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AstCompiler;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.Message;

public class Problem {
    public static int forMessages(CompilationUnit cu, List<Problem> result) {
        Message[] all;
        
        all = cu.getMessages();
        for (Message msg : all) {
            result.add(new Problem(getPosition(cu, msg.getStartPosition()), msg.getMessage()));
        }
        return all.length;
    }

    public static void attach(ASTNode node, String msg) {
        CompilationUnit cu;
        
        cu = getCompilationUnit(node);
        getProblems(cu).add(new Problem(getPosition(cu, node.getStartPosition()), msg));
    }

    public static Problem create(ASTNode node, String msg) {
        CompilationUnit cu;
        
        cu = Problem.getCompilationUnit(node);
        return new Problem(Problem.getPosition(cu, node.getStartPosition()), msg);
    }
    
    private final String position;
    private final String msg;
    
    public Problem(String position, String msg) {
        this.position = position;
        this.msg = msg;
    }
    
    @Override
    public String toString() {
        return position + ":" + msg;
    }

    //--
    
    public static List<Problem> getProblems(CompilationUnit cu) {
        final String key = "toolkit.problems";
        List<Problem> problems;
        
        problems = (List) cu.getProperty(key);
        if (problems == null) {
            problems = new ArrayList<Problem>();
            cu.setProperty(key, problems);
        }
        return problems;
    }
    
    public static String getPosition(CompilationUnit cu, int pos) {
        StringBuilder builder;
        
        builder = new StringBuilder();
        builder.append(getFileName(cu));
        builder.append(':');
        builder.append(cu.getLineNumber(pos));
        builder.append(':');
        builder.append(cu.getColumnNumber(pos));
        return builder.toString();
    }
    
    public static String getFileName(CompilationUnit cu) {
        return (String) cu.getProperty(AstCompiler.FILE_NAME);
    }

    public static String getSource(ASTNode node) {
        CompilationUnit cu;
        String all;
        int start;
        
        cu = getCompilationUnit(node);
        all = (String) cu.getProperty(AstCompiler.CONTENTS);
        start = node.getStartPosition();
        return all.substring(start, start + node.getLength());
    }
    
    public static CompilationUnit getCompilationUnit(ASTNode node) {
        while (!(node instanceof CompilationUnit)) {
            node = getCompilationUnit(node.getParent());
        }
        return (CompilationUnit) node;
    }
}
