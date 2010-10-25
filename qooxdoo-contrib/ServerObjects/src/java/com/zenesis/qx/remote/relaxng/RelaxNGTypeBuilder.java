package com.zenesis.qx.remote.relaxng;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import javax.xml.namespace.QName;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamWriter;

import org.apache.log4j.Logger;
import org.kohsuke.rngom.ast.builder.SchemaBuilder;
import org.kohsuke.rngom.ast.util.CheckingSchemaBuilder;
import org.kohsuke.rngom.digested.DAnnotation;
import org.kohsuke.rngom.digested.DAnnotation.Attribute;
import org.kohsuke.rngom.digested.DAttributePattern;
import org.kohsuke.rngom.digested.DContainerPattern;
import org.kohsuke.rngom.digested.DDataPattern;
import org.kohsuke.rngom.digested.DElementPattern;
import org.kohsuke.rngom.digested.DGrammarPattern;
import org.kohsuke.rngom.digested.DOneOrMorePattern;
import org.kohsuke.rngom.digested.DOptionalPattern;
import org.kohsuke.rngom.digested.DPattern;
import org.kohsuke.rngom.digested.DPatternWalker;
import org.kohsuke.rngom.digested.DRefPattern;
import org.kohsuke.rngom.digested.DSchemaBuilderImpl;
import org.kohsuke.rngom.digested.DValuePattern;
import org.kohsuke.rngom.digested.DXMLPrinter;
import org.kohsuke.rngom.digested.DXmlTokenPattern;
import org.kohsuke.rngom.digested.DZeroOrMorePattern;
import org.kohsuke.rngom.nc.SimpleNameClass;
import org.kohsuke.rngom.parse.Parseable;
import org.kohsuke.rngom.parse.compact.CompactParseable;
import org.kohsuke.rngom.parse.xml.SAXParseable;
import org.relaxng.datatype.Datatype;
import org.relaxng.datatype.DatatypeException;
import org.relaxng.datatype.DatatypeLibrary;
import org.xml.sax.ErrorHandler;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

import com.zenesis.qx.remote.MetaClass;
import com.zenesis.qx.remote.annotations.Remote;

/**
 * Reads a RelaxNG schema file to generate a ProxyType definition.  The RelaxNG schema must 
 * be annotated to properly describe the type. 
 * 
 * @author john
 */
public class RelaxNGTypeBuilder {
	
	private static final Logger log = Logger.getLogger(RelaxNGTypeBuilder.class);
	
	private static final String NS = "http://www.zenesis.com/qso/relaxng/1.0";

	/*
	 * Identifies the cardinality of the current element
	 */
	private enum Cardinality {
		ONE,
		OPTIONAL,
		ONE_OR_MORE,
		ZERO_OR_MORE
	}
	
	/*
	 * Helper class than reads annotations in our namespace and coerces them into
	 * native values for ease of use
	 */
	private static class QSOAnnotations {
		public String name;
		public boolean readOnly;
		public Remote.Sync sync = Remote.Sync.QUEUE;
		public boolean onDemand;
		public Class propertyClass;
		public Remote.Array array;
		public Class collectionClass;
		public boolean exceptions;
		
		public boolean collapse;
		public boolean expand;

		/**
		 * Constructor
		 * @param annotation
		 */
		public QSOAnnotations(DAnnotation annotation) {
			super();
			Map<QName, Attribute> map = annotation.getAttributes();

			for (QName qName : map.keySet()) {
				if (!qName.getNamespaceURI().equals(NS))
					continue;
				String name = xmlToCamelCase(qName.getLocalPart());
				Attribute attr = map.get(qName);
				String value = attr.getValue();
				try {
					Field field = QSOAnnotations.class.getField(name);
					Class clazz = field.getType();
					if (clazz == String.class)
						field.set(this, value);
					else if (clazz == boolean.class)
						field.set(this, Boolean.parseBoolean(value));
					else if (clazz == Remote.Sync.class)
						field.set(this, Remote.Sync.valueOf(xmlToEnum(value)));
					else if (clazz == Remote.Array.class)
						field.set(this, Remote.Array.valueOf(xmlToEnum(value)));
					else
						throw new IllegalArgumentException("Cannot set value for " + name + "=" + value + " because of unreognised type " + clazz);
				}catch(NoSuchFieldException e) {
					log.error("Unexpected annotation: " + name);
				}catch(RuntimeException e) {
					throw e;
				}catch(Exception e) {
					log.error("Error while setting annotation field " + name + "=" + value + ": " + e.getClass() + ": " + e.getMessage(), e);
				}
			}
		}
		
		/**
		 * Simple helper method that sets all properties
		 * @param prop
		 */
		public void configure(RngProxyProperty prop, Cardinality cardinality) {
			prop.setReadOnly(readOnly);
			prop.setSync(sync);
			prop.setOnDemand(onDemand);
			prop.setSendExceptions(exceptions);
			
			MetaClass meta = prop.getPropertyClass();
			if (propertyClass != null) {
				meta = new MetaClass(propertyClass);
				prop.setPropertyClass(meta);
			}
			
			if (cardinality == Cardinality.ONE_OR_MORE || cardinality == Cardinality.ZERO_OR_MORE) {
				meta.setArray(true);
				if (array != Remote.Array.DEFAULT)
					meta.setWrapArray(array == Remote.Array.WRAP);
				if (collectionClass != null) {
					if (!Collection.class.isAssignableFrom(collectionClass))
						throw new IllegalArgumentException("qso:collection-class must be derived from Collection");
					meta.setCollectionClass(collectionClass);
				}
			}
			
			prop.setNullable(cardinality == Cardinality.OPTIONAL || cardinality == Cardinality.ZERO_OR_MORE);
		}
	}
	
	/*
	 * BuilderVisitor performs the population of a single RngProxyType; when nested or
	 * referred types are encountered, a new instance of BuilderVisitor is used to
	 * populate the new type.
	 */
	private class BuilderVisitor extends DPatternWalker {
		
		public final RngProxyType proxyType;
		public Cardinality cardinality = Cardinality.ONE;

		public BuilderVisitor(RngProxyType proxyType) {
			super();
			this.proxyType = proxyType;
		}

		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onAttribute(org.kohsuke.rngom.digested.DAttributePattern)
		 */
		@Override
		public Void onAttribute(DAttributePattern p) {
			try {
				QSOAnnotations annos = new QSOAnnotations(p.getAnnotation());
				
				DValuePattern vp = (DValuePattern)p.getChild();
				DatatypeLibrary library = s_libraryFactory.createDatatypeLibrary(vp.getDatatypeLibrary());
				Datatype datatype = library != null ? library.createDatatype(vp.getType()) : null;
				
				String propName = annos.name;
				if (propName == null)
					propName = getJavaIdent(p);
				
				RngProxyProperty prop = new RngProxyProperty(propName, datatype);
				annos.configure(prop, cardinality);
				proxyType.addProperty(prop);
				return null;
			}catch(DatatypeException e) {
				throw new TypeBuilderException("Error while loading datatype ", e, p);
			}
		}

		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onElement(org.kohsuke.rngom.digested.DElementPattern)
		 */
		@Override
		public Void onElement(DElementPattern p) {
			onElement(p, p);
			return null;
		}
		
		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onRef(org.kohsuke.rngom.digested.DRefPattern)
		 */
		@Override
		public Void onRef(DRefPattern p) {
			DElementPattern target = (DElementPattern)p.getTarget().getPattern();
			onElement(p, target);
			return null;
		}

		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onOneOrMore(org.kohsuke.rngom.digested.DOneOrMorePattern)
		 */
		@Override
		public Void onOneOrMore(DOneOrMorePattern p) {
			Cardinality old = cardinality;
			cardinality = Cardinality.ONE_OR_MORE;
			super.onOneOrMore(p);
			cardinality = old;
			return null;
		}

		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onOptional(org.kohsuke.rngom.digested.DOptionalPattern)
		 */
		@Override
		public Void onOptional(DOptionalPattern p) {
			Cardinality old = cardinality;
			cardinality = Cardinality.OPTIONAL;
			super.onOptional(p);
			cardinality = old;
			return null;
		}

		/* (non-Javadoc)
		 * @see org.kohsuke.rngom.digested.DPatternWalker#onZeroOrMore(org.kohsuke.rngom.digested.DZeroOrMorePattern)
		 */
		@Override
		public Void onZeroOrMore(DZeroOrMorePattern p) {
			Cardinality old = cardinality;
			cardinality = Cardinality.ZERO_OR_MORE;
			super.onZeroOrMore(p);
			cardinality = old;
			return null;
		}

		/**
		 * Creates a new proxy type, unless one exists in the cache already
		 * @param qName
		 * @return
		 */
		private RngProxyType getProxyType(QName qName) {
			RngProxyType proxyType = proxyTypes.get(qName);
			if (proxyType == null) {
				proxyType = new RngProxyType(packageName, firstUp(xmlToCamelCase(qName.getLocalPart())));
				proxyTypes.put(qName, proxyType);
			}
			return proxyType;
		}
		
		/**
		 * Copies properties from container and adds them to the destProxyType
		 * @param container
		 * @param destProxyType
		 */
		private void addProperties(DContainerPattern container, RngProxyType destProxyType) {
			for (DPattern child : container) {
				if (child instanceof DDataPattern) {
					// TODO text part
				} else
					child.accept(new BuilderVisitor(destProxyType));
			}
		}
		
		/**
		 * Creates a new property, the datatype of which is another ProxyType
		 * @param target
		 * @param annos
		 * @param destProxyType
		 * @return
		 */
		private RngProxyProperty createProperty(DElementPattern target, QSOAnnotations annos, RngProxyType destProxyType) {
			String propName = annos.name;
			if (propName == null)
				propName = getJavaIdent(target);
			
			RngProxyProperty prop = new RngProxyProperty(propName, destProxyType);
			annos.configure(prop, cardinality);
			return prop;
		}
		
		/**
		 * Creates a new property, the datatype of which is an XML datatype value
		 * @param target
		 * @param annos
		 * @param vp
		 * @return
		 * @throws DatatypeException
		 */
		private RngProxyProperty createProperty(DElementPattern target, QSOAnnotations annos, DDataPattern vp) throws DatatypeException {
			DatatypeLibrary library = s_libraryFactory.createDatatypeLibrary(vp.getDatatypeLibrary());
			Datatype datatype = library != null ? library.createDatatype(vp.getType()) : null;
			
			String propName = annos.name;
			if (propName == null)
				propName = getJavaIdent(target);
			
			RngProxyProperty prop = new RngProxyProperty(propName, datatype);
			annos.configure(prop, cardinality);
			
			return prop;
		}
		
		/**
		 * Handles an element and is also used by references
		 * @param p the pattern where the use was declared (i.e. the reference)
		 * @param target the pattern with the definition (i.e. the element)
		 */
		public void onElement(DPattern p, DElementPattern target) {
			try {
				QSOAnnotations annos = new QSOAnnotations(p.getAnnotation());
				QName qName = ((SimpleNameClass)target.getName()).name;
				
				if (target.getChild() instanceof DContainerPattern) {
					if (!annos.collapse) {
						RngProxyType childProxyType = getProxyType(qName);
						RngProxyProperty prop = createProperty(target, annos, childProxyType);
						proxyType.addProperty(prop);
						addProperties((DContainerPattern)target.getChild(), childProxyType);
						
					} else
						addProperties((DContainerPattern)target.getChild(), proxyType);
					
				// Not complex
				} else {
					if (!annos.expand) {
						RngProxyProperty prop = createProperty(target, annos, (DDataPattern)target.getChild());
						proxyType.addProperty(prop);

					} else {
						RngProxyType childProxyType = getProxyType(qName);
						RngProxyProperty prop = createProperty(target, annos, (DDataPattern)target.getChild());
						childProxyType.addProperty(prop);
						
						prop = createProperty(target, annos, childProxyType);
						proxyType.addProperty(prop);
					}
				}
			}catch(DatatypeException e) {
				throw new TypeBuilderException("Error while loading datatype ", e, target);
			}
		}
		
		/**
		 * Produces a Java identifier from the local part of a pattern's name
		 */
		public String getJavaIdent(DXmlTokenPattern p) {
			SimpleNameClass name = (SimpleNameClass)p.getName();
			String str = xmlToCamelCase(name.name.getLocalPart());
			return str;
		}
	}
	
	private static final DefaultDatatypeLibraryFactory s_libraryFactory = new DefaultDatatypeLibraryFactory();
	
	// Either schemaFile or schemaReader is non-null
	private final File schemaFile;
	private final Reader schemaReader;
	private final boolean isCompact;
	
	// The grammar and processed types
	private final String packageName;
	private DGrammarPattern grammar;
	private String namespaceUri;
	private RngProxyType startProxyType;
	private final HashMap<QName, RngProxyType> proxyTypes = new HashMap<QName, RngProxyType>();

	/**
	 * Constructor, detects whether the file is compact syntax from the extension ".rnc"
	 * @param schemaFile
	 */
	public RelaxNGTypeBuilder(File schemaFile, String packageName) throws FileNotFoundException {
		super();
		this.schemaFile = schemaFile;
		if (!schemaFile.exists() || !schemaFile.isFile() || !schemaFile.canRead())
			throw new FileNotFoundException("Cannot read from file " + schemaFile.getAbsolutePath());
		schemaReader = null;
		isCompact = schemaFile.getName().endsWith(".rnc");
		this.packageName = packageName;
	}

	/**
	 * Constructor
	 * @param schemaReader
	 * @param isCompact
	 */
	public RelaxNGTypeBuilder(Reader schemaReader, boolean isCompact, String packageName) {
		super();
		this.schemaFile = null;
		this.schemaReader = schemaReader;
		this.isCompact = isCompact;
		this.packageName = packageName;
	}

	/**
	 * Constructor
	 * @param stream
	 * @param isCompact
	 */
	public RelaxNGTypeBuilder(InputStream stream, boolean isCompact, String packageName) {
		super();
		this.schemaFile = null;
		this.schemaReader = new InputStreamReader(stream);
		this.isCompact = isCompact;
		this.packageName = packageName;
	}

	/**
	 * Parses the schema to produce ProxyType definitions
	 */
	protected void parse() {
		if (startProxyType != null)
			return;
        try {
            // the error handler passed to Parseable will receive parsing errors.
            ErrorHandler eh = new DefaultHandler() {
                @Override
    			public void error(SAXParseException e) throws SAXException {
                    throw e;
                }
            };

            // Create something to parse the file
            Parseable parseable;
            Reader schemaReader = this.schemaReader;
            if (schemaReader == null)
            	schemaReader = new FileReader(schemaFile);
            if (!isCompact)
                parseable = new SAXParseable(new InputSource(schemaReader), eh);
            else
                parseable = new CompactParseable(new InputSource(schemaReader), eh);

            // Parse it, checking it for errors
            SchemaBuilder sb = new CheckingSchemaBuilder(new DSchemaBuilderImpl(), eh);
            grammar = (DGrammarPattern) parseable.parse(sb);
            
            XMLOutputFactory factory = XMLOutputFactory.newInstance();
            XMLStreamWriter output = factory.createXMLStreamWriter(System.out);
            DXMLPrinter printer = new DXMLPrinter(output);
            printer.printDocument(grammar);
            
            // Load it (convert to ProxyTypes)
    		DElementPattern start = (DElementPattern)grammar.getStart();
    		QName qName = ((SimpleNameClass)start.getName()).name;
    		namespaceUri = qName.getNamespaceURI();
    		startProxyType = new RngProxyType(packageName, firstUp(xmlToCamelCase(qName.getLocalPart())));
    		proxyTypes.put(qName, startProxyType);
    		DContainerPattern container = (DContainerPattern)start.getChild();
			for (DPattern child : container) {
				if (child instanceof DDataPattern) {
					// TODO text part
				} else
					child.accept(new BuilderVisitor(startProxyType));
			}
    		
        } catch(RuntimeException e) {
        	throw e;
        } catch (Throwable e) {
            if (e.getCause() instanceof SAXParseException)
            	e = e.getCause();
            if (schemaFile != null)
            	throw new IllegalStateException("Error while processing " + schemaFile.getAbsolutePath() + ": " + e.getMessage(), e);
            throw new IllegalStateException("Error while processing RelaxNG stream: " + e.getMessage(), e);
        }
	}
	
	/**
	 * Loads an instance from an XML file (which must conform to this schema)
	 * @param file
	 * @return
	 * @throws IOException
	 */
	public Instance loadFromXml(File file) throws IOException {
		FileReader fr = new FileReader(file);
		try {
			return loadFromXml(fr);
		} catch(IOException e) {
			try { fr.close(); } catch(IOException e2) {;}
			throw e;
		}
	}

	/**
	 * Loads an instance from this XML stream (which must conform to this schema)
	 * @param file
	 * @return
	 * @throws IOException
	 */
	public Instance loadFromXml(InputStream is) throws IOException {
		InputStreamReader reader = new InputStreamReader(is);
		return loadFromXml(reader);
	}

	/**
	 * @return the startProxyType
	 */
	public RngProxyType getStartProxyType() {
		parse();
		return startProxyType;
	}
	
	/**
	 * Returns the proxy types
	 * @return
	 */
	public Collection<RngProxyType> getProxyTypes() {
		parse();
		return proxyTypes.values();
	}

	/**
	 * Loads an instance from this XML stream (which must conform to this schema)
	 * @param file
	 * @return
	 * @throws IOException
	 */
	public Instance loadFromXml(Reader reader) throws IOException {
		return null;
	}
	
	/**
	 * Creates an instance of the start type
	 * @return
	 */
	public Instance newStartInstance() {
		parse();
		return new Instance(startProxyType);
	}
	
	/**
	 * Creates an Instance of the named class
	 * @param className
	 * @return
	 * @throws IllegalArgumentException
	 */
	public Instance newInstance(String className) throws IllegalArgumentException{
		parse();
		RngProxyType type = proxyTypes.get(new QName(namespaceUri, className));
		if (type == null)
			type = proxyTypes.get(new QName(namespaceUri, camelCaseToXml(className)));
		if (type == null)
			throw new IllegalArgumentException("Cannot find RNG class called " + className + " in namespace " + getNamespaceUri());
		return new Instance(type);
	}

	/**
	 * @return the namespaceUri
	 */
	public String getNamespaceUri() {
		return namespaceUri;
	}

	/**
	 * Converts from xml style identifiers to camel case, i.e. my-first-word becomes myFirstWord
	 * @param str
	 * @return
	 */
	private static String xmlToCamelCase(String str) {
		if (str == null)
			return null;
		StringBuilder sb = new StringBuilder(str);
		char lastC = 0;
		for (int i = 0; i < sb.length(); i++) {
			char c = sb.charAt(i);
			if (c == '-') {
				sb.deleteCharAt(i);
				i--;
			} else if (lastC == '-')
				sb.setCharAt(i, Character.toUpperCase(c));
			else
				sb.setCharAt(i, Character.toLowerCase(c));
			lastC = c;
		}
		return sb.toString();
	}
	
	/**
	 * Converts a camel case identifier to XML style i.e. myFirstWord becomes my-first-word
	 * @param str
	 * @return
	 */
	public static String camelCaseToXml(String str) {
		if (str == null)
			return null;
		StringBuilder sb = new StringBuilder(str);
		char lastC = 0;
		for (int i = 0; i < sb.length(); i++) {
			char c = sb.charAt(i);
			if (Character.isUpperCase(c)) {
				if (lastC != 0 && Character.isLowerCase(lastC)) {
					sb.insert(i, '-');
					i++;
				}
				sb.setCharAt(i, Character.toLowerCase(c));
			}
			lastC = c;
		}
		return sb.toString();
	}

	/**
	 * Converts xml style identifiers to enum style, i.e. my-first-word becomes MY_FIRST_WORD 
	 * @param str
	 * @return
	 */
	private static String xmlToEnum(String str) {
		if (str == null)
			return null;
		StringBuilder sb = new StringBuilder(str);
		for (int i = 0; i < sb.length(); i++) {
			char c = sb.charAt(i);
			if (c == '-')
				sb.setCharAt(i, '_');
			else
				sb.setCharAt(i, Character.toUpperCase(c));
		}
		return sb.toString();
	}
	
	/**
	 * Makes the first character uppercase
	 * @param str
	 * @return
	 */
	private static String firstUp(String str) {
		if (str == null || str.length() == 0 || Character.isUpperCase(str.charAt(0)))
			return str;
		str = Character.toUpperCase(str.charAt(0)) + str.substring(1);
		return str;
	}
}
