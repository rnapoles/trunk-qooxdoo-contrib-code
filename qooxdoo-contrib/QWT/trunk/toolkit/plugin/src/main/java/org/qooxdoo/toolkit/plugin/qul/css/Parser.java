package org.qooxdoo.toolkit.plugin.qul.css;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;

import org.qooxdoo.sushi.io.Node;
import org.w3c.css.sac.InputSource;
import org.w3c.dom.css.CSSRule;
import org.w3c.dom.css.CSSRuleList;
import org.w3c.dom.css.CSSStyleRule;
import org.w3c.dom.css.CSSStyleSheet;

import com.steadystate.css.parser.CSSOMParser;

public class Parser {
    public static Css loadString(String str) {
        try {
            return load(new StringReader(str));
        } catch (IOException e) {
            throw new RuntimeException("unexpected", e);
        }
    }

    public static Css load(Node src) throws IOException {
        Reader reader;
        Css result;
        
        reader = src.createReader();
        result = load(reader);
        reader.close();
        return result;
    }

    public static Css load(Reader r) throws IOException {
        CSSOMParser parser;
        InputSource is;
        CSSStyleSheet result;
        
        parser = new CSSOMParser();
        is = new InputSource(r);
        result = parser.parseStyleSheet(is);
        return map(result);
    }
    
    private static Css map(CSSStyleSheet style) {
        CSSRuleList all;
        Css result;
        
        result = new Css();
        all = style.getCssRules();
        for (int i = 0, max = all.getLength(); i < max; i++) {
            result.add(rule(all.item(i)));
        }
        return result;
    }

    private static StyleRule rule(CSSRule item) {
        switch (item.getType()) {
        case CSSRule.STYLE_RULE:
            return styleRule((CSSStyleRule) item);
        default:
            throw new UnsupportedOperationException("" + item.getType());
        }
    }
    private static StyleRule styleRule(CSSStyleRule rule) {
        return new StyleRule(rule.getSelectorText(), rule.getStyle());
    }
}