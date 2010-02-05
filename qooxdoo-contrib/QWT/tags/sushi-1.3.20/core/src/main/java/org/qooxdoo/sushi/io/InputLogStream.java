package org.qooxdoo.sushi.io;

import java.io.IOException;
import java.io.OutputStream;
import java.io.InputStream;
import java.io.FilterInputStream;

public class InputLogStream extends FilterInputStream {
	private final OutputStream log;

	public InputLogStream(InputStream src, OutputStream log) {
		super(src);
		this.log = log;
    }

	@Override
    public int read() throws IOException {
        int c;
        
        c = in.read();
        if (c != -1) {
            log.write((char) c);
            if (c == '\n') {
            	log.flush();
            }
        }
        return c;
    }
	
    @Override
    public int read(byte b[], int off, int len) throws IOException {
        int result;
        
        result = in.read(b, off, len);
        if (result != -1) {
            log.write(b, off, result);
            log.flush();
        }
        return result;
    }
}
