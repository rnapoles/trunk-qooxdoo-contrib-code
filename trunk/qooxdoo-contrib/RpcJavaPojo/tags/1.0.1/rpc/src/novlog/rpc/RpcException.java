/*
    Java JSON RPC
    RPC Java POJO by Novlog
    http://www.novlog.com

    This library is dual-licensed under the GNU Lesser General Public License (LGPL) and the Eclipse Public License (EPL).
    Check http://qooxdoo.org/license

    This library is also licensed under the Apache license.
    Check http://www.apache.org/licenses/LICENSE-2.0

    Contribution:
    This contribution is provided by Novlog company.
    http://www.novlog.com
 */

package novlog.rpc;

public class RpcException extends Exception {
    protected Integer origin = null;
    protected Integer errorCode = null;

    public RpcException(Integer origin) {
        this(origin, null);
    }

    public RpcException(Integer origin, Integer errorCode) {
        super();
        this.origin = origin;
        this.errorCode = errorCode;
    }

    public RpcException(Integer origin, Integer errorCode, String message) {
        super(message);
        this.origin = origin;
        this.errorCode = errorCode;
    }

    public RpcException(Integer origin, Integer errorCode, String message, Throwable t) {
        super(message, t);
        this.origin = origin;
        this.errorCode = errorCode;
    }

    public Integer getOrigin() {
        return origin;
    }

    public Integer getErrorCode() {
        return errorCode;
    }
}