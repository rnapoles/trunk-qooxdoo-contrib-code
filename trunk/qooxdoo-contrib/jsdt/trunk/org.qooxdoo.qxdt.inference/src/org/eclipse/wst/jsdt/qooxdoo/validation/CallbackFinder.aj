import org.eclipse.wst.jsdt.core.infer.InferEngine;

public aspect CallbackFinder {
  pointcut visit() : within(InferEngine+) 
  && execution(* *.visit(..));
 
  after() : visit() { 
//    System.out.println(thisJoinPoint.getSignature().toString());
//    System.out.println( "   " + thisJoinPoint.getArgs()[0]);
  }

//  pointcut doInfer() : within(org.eclipse.wst.jsdt.internal.infer.InferEngine+) 
//  && execution(* *.doInfer(..));
//  
//  after() : doInfer() {
//    System.out.println(thisJoinPoint.getSignature().toLongString());
//  }
}
