ifneq ($(CONTRIBS),)

  EXTERNAL_CLASS_PATH = $(patsubst %,--class-path %/source/class, $(CONTRIBS))
  EXTERNAL_CLASS_URI = $(patsubst %, --class-uri ../%/source/class, $(CONTRIBS))

  # will create lines like this:
  # --use-setting $(EXTERNAL_NAMESPACE).resourceUri:../$(HTMLAREA)/source/resource
  EXTERNAL_SOURCE_SETTINGS = $(patsubst %, --use-setting %, $(join $(patsubst %, %.resourceUri:../, $(CONTRIBS_NAMESPACES)), $(patsubst %, %/source/resource, $(CONTRIBS))))

  # will create lines like this:
  # --use-setting $(EXTERNAL_NAMESPACE).resourceUri:$(APPLICATION_HTML_TO_ROOT_URI)/resource/$(EXTERNAL_NAMESPACE)
  EXTERNAL_BUILD_SETTINGS = $(patsubst %, --use-setting %, $(join $(patsubst %, %.resourceUri:$(APPLICATION_HTML_TO_ROOT_URI)/resource/, $(CONTRIBS_NAMESPACES)), $(CONTRIBS_NAMESPACES)))

  APPLICATION_ADDITIONAL_BUILD_OPTIONS += \
    --copy-resources \
    $(patsubst %,--resource-input %/source/resource, $(CONTRIBS)) \
    $(patsubst %,--resource-output $(APPLICATION_BUILD_PATH)/resource/%, $(CONTRIBS_NAMESPACES)) \
    $(EXTERNAL_BUILD_SETTINGS) \
    $(EXTERNAL_CLASS_PATH) \
    $(EXTERNAL_CLASS_URI)

  APPLICATION_ADDITIONAL_SOURCE_OPTIONS += \
    $(EXTERNAL_SOURCE_SETTINGS) \
    $(EXTERNAL_CLASS_PATH) \
    $(EXTERNAL_CLASS_URI)

endif
