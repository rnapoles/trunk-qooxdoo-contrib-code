/** <h3> chrome API Documentation </h3>
 *
 * This set of classes serves as a basis for creating units of JavaScript
 * code which are specific to plugins and extensions for the Chrome and
 * Chromium web browsers.  Use these classes to facilitate easier
 * communication with your plugin's Background service page.
 * 
 * The first set of such classes are the Service and ServiceImpl classes
 * in the chrome.backend package.
 * The Service represents the front-end part of a connection to the
 * background and will be called by the code in your browser- or page-
 * action.  The ServiceImpl class should be extended in your background
 * code and will serve as the implementation point for your service. You
 * will still need to instantiate a copy of your class in the constructor
 * of your backend application so that the endpoint is registered.
 *
 */
