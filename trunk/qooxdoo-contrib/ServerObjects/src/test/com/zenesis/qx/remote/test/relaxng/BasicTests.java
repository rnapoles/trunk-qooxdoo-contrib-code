package com.zenesis.qx.remote.test.relaxng;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import com.zenesis.qx.remote.relaxng.Instance;
import com.zenesis.qx.remote.relaxng.RelaxNGTypeBuilder;
import com.zenesis.qx.remote.relaxng.RngProxyType;
import com.zenesis.qx.remote.test.AbstractRemoteTestCase;

public class BasicTests extends AbstractRemoteTestCase {

	public void testVarious() throws Exception {
		generate("testVarious");
	}

	public void testScalars() throws Exception {
		generate("testScalars");
	}
	
	public void testArrays() throws Exception {
		generate("testArrays");
	}
	
	private void generate(String testname) throws IOException {
		String filename = getClass().getSimpleName() + "." + testname + ".rnc";
		RelaxNGTypeBuilder factory = new RelaxNGTypeBuilder(getClass().getResourceAsStream(filename), true, "my.package");
		ArrayList<RngProxyType> types = new ArrayList<RngProxyType>(factory.getProxyTypes());
		Collections.sort(types, new Comparator<RngProxyType>() {
			@Override
			public int compare(RngProxyType left, RngProxyType right) {
				return left.getClassName().compareToIgnoreCase(right.getClassName());
			}
		});

		Instance instance = factory.newStartInstance();

		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);
		tracker.toJSON(instance, pw);
		pw.flush();
		assertFromFile(sw.toString(), getClass().getSimpleName() + "." + testname);
	}
}
