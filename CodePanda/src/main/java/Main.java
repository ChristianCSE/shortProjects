import static spark.Spark.*;

public class Main {
	
	static public int killAll(){
		stop();
		return 0;
	}
	
	public static void main(String[] args) {
		get("/", (req, res)-> "Basic Intro");
		get("/hello", (req, res)-> "Hello World");
		get("/kill", (req, res)-> killAll());
		get("/person/:name", (req, res)->{
			return "<h1> Hello there Sir " + req.params(":name") + "! </h1>";
		});
		get("/wildcard/*/hello", (req, res)-> {
			int len = req.splat().length;
			String hold = "";
			for(int i = 0; i < len; i++) {
				hold += req.splat()[i];
			}
			return "<h2> Why was this sent? " + hold + " !</h2>";
		});
		
		
//		path("/local", ()-> {
//			before("/*", (q, a)-> log.info("api call made")); 
//			path("/email", ()->{
//				get("none", (req, res)-> "no" );
//			});
//			path("/names", ()->{
//				
//			});
//		});
	}
}
