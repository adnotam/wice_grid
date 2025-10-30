(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // app/assets/javascripts/src/wice_grid_processor.js.coffee
  var require_wice_grid_processor_js = __commonJS({
    "app/assets/javascripts/src/wice_grid_processor.js.coffee"(exports) {
      (function() {
        var WiceGridProcessor2;
        WiceGridProcessor2 = (function() {
          class WiceGridProcessor3 {
            constructor(name, baseRequestForFilter, baseLinkForShowAllRecords, linkForExport, parameterNameForQueryLoading, parameterNameForFocus, environment) {
              this.name = name;
              this.baseRequestForFilter = baseRequestForFilter;
              this.baseLinkForShowAllRecords = baseLinkForShowAllRecords;
              this.linkForExport = linkForExport;
              this.parameterNameForQueryLoading = parameterNameForQueryLoading;
              this.parameterNameForFocus = parameterNameForFocus;
              this.environment = environment;
              this.filterDeclarations = new Array();
              this.checkIfJsFrameworkIsLoaded();
            }
            checkIfJsFrameworkIsLoaded() {
              if (!jQuery) {
                return alert("jQuery not loaded, WiceGrid cannot proceed!");
              }
            }
            toString() {
              return "<WiceGridProcessor instance for grid '" + this.name + "'>";
            }
            process(domIdToFocus) {
              return this.visit(this.buildUrlWithParams(domIdToFocus));
            }
            visit(path, use_turbo = true) {
              if (typeof Turbo !== "undefined" && Turbo !== null && use_turbo) {
                return Turbo.visit(path);
              } else if (typeof Turbolinks !== "undefined" && Turbolinks !== null && use_turbo) {
                return Turbolinks.visit(path);
              } else {
                return window.location = path;
              }
            }
            setProcessTimer(domIdToFocus) {
              var processor;
              if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
              }
              processor = this;
              return this.timer = setTimeout(function() {
                return processor.process(domIdToFocus);
              }, 1e3);
            }
            reloadPageForGivenGridState(gridState) {
              var requestPath;
              requestPath = this.gridStateToRequest(gridState);
              return this.visit(this.appendToUrl(this.baseLinkForShowAllRecords, requestPath));
            }
            gridStateToRequest(gridState) {
              return jQuery.map(gridState, function(pair) {
                return encodeURIComponent(pair[0]) + "=" + encodeURIComponent(pair[1]);
              }).join("&");
            }
            appendToUrl(url, str) {
              var sep;
              sep = url.indexOf("?") !== -1 ? /[&\?]$/.exec(url) ? "" : "&" : "?";
              return url + sep + str;
            }
            buildUrlWithParams(domIdToFocus) {
              var allFilterParams, res, results;
              results = new Array();
              jQuery.each(this.filterDeclarations, (i, filterDeclaration) => {
                var param;
                param = this.readValuesAndFormQueryString(filterDeclaration.filterName, filterDeclaration.detached, filterDeclaration.templates, filterDeclaration.ids);
                if (param && param !== "") {
                  return results.push(param);
                }
              });
              res = this.baseRequestForFilter;
              if (results.length !== 0) {
                allFilterParams = results.join("&");
                res = this.appendToUrl(res, allFilterParams);
              }
              if (domIdToFocus) {
                res = this.appendToUrl(res, this.parameterNameForFocus + domIdToFocus);
              }
              return res;
            }
            reset() {
              return this.visit(this.baseRequestForFilter);
            }
            exportToCsv() {
              return this.visit(this.linkForExport, false);
            }
            register(func) {
              return this.filterDeclarations.push(func);
            }
            readValuesAndFormQueryString(filterName, detached, templates, ids) {
              var el, i, j, k, l, message, ref, ref1, res, val;
              res = new Array();
              for (i = k = 0, ref = templates.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
                if ($(ids[i]) === null) {
                  if (this.environment === "development") {
                    message = 'WiceGrid: Error reading state of filter "' + filterName + '". No DOM element with id "' + ids[i] + '" found.';
                    if (detached) {
                      message += 'You have declared "' + filterName + '" as a detached filter but have not output it anywhere in the template. Read documentation about detached filters.';
                    }
                    alert(message);
                  }
                  return "";
                }
                el = $("#" + ids[i]);
                if (el[0] && el[0].type === "checkbox") {
                  if (el[0].checked) {
                    val = 1;
                  }
                } else {
                  val = el.val();
                }
                if (val instanceof Array) {
                  for (j = l = 0, ref1 = val.length - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; j = 0 <= ref1 ? ++l : --l) {
                    if (val[j] && val[j] !== "") {
                      res.push(templates[i] + encodeURIComponent(val[j]));
                    }
                  }
                } else if (val && val !== "") {
                  res.push(templates[i] + encodeURIComponent(val));
                }
              }
              return res.join("&");
            }
          }
          ;
          WiceGridProcessor3;
          return WiceGridProcessor3;
        }).call(this);
        WiceGridProcessor2._version = "3.4";
        window["WiceGridProcessor"] = WiceGridProcessor2;
      }).call(exports);
    }
  });

  // app/assets/javascripts/src/wice_grid_init.js.coffee
  var require_wice_grid_init_js = __commonJS({
    "app/assets/javascripts/src/wice_grid_init.js.coffee"(exports) {
      (function() {
        var SetEnd, focusElementIfNeeded, getGridProcessorForElement, globalVarForAllGrids, initWiceGrid, isKeySignificant, moveDateBoundIfInvalidPeriod, setupAutoreloadsForExternalFilters, setupAutoreloadsForInternalFilters, setupBootstrapDatepicker, setupBulkToggleForActionColumn, setupCsvExport, setupDatepicker, setupExternalCsvExport, setupExternalSubmitReset, setupHidingShowingOfFilterRow, setupJqueryUiDatepicker, setupMultiSelectToggle, setupShowingAllRecords, setupSubmitReset;
        if (typeof Turbo !== "undefined" && Turbo !== null) {
          $(document).on("turbo:load", function() {
            return initWiceGrid();
          });
        } else {
          $(function() {
            return initWiceGrid();
          });
          $(document).on("turbolinks:render", function() {
            if (typeof Turbolinks !== "undefined" && Turbolinks !== null) {
              return initWiceGrid();
            }
          });
        }
        globalVarForAllGrids = "wiceGrids";
        initWiceGrid = function() {
          $(".wice-grid-container").each(function(index, wiceGridContainer) {
            var dataDiv, filterDeclaration, filterDeclarations, gridName, gridProcessor, i, len, processorInitializerArguments;
            gridName = wiceGridContainer.id;
            dataDiv = $(".wg-data", wiceGridContainer);
            processorInitializerArguments = dataDiv.data("processor-initializer-arguments");
            filterDeclarations = dataDiv.data("filter-declarations");
            focusElementIfNeeded(dataDiv.data("foc"));
            gridProcessor = new WiceGridProcessor(gridName, processorInitializerArguments[0], processorInitializerArguments[1], processorInitializerArguments[2], processorInitializerArguments[3], processorInitializerArguments[4], processorInitializerArguments[5]);
            for (i = 0, len = filterDeclarations.length; i < len; i++) {
              filterDeclaration = filterDeclarations[i];
              (function(filterDeclaration2) {
                if (filterDeclaration2 != null) {
                  return gridProcessor.register({
                    filterName: filterDeclaration2.filterName,
                    detached: filterDeclaration2.detached,
                    templates: filterDeclaration2.declaration.templates,
                    ids: filterDeclaration2.declaration.ids
                  });
                }
              })(filterDeclaration);
            }
            if (!window[globalVarForAllGrids]) {
              window[globalVarForAllGrids] = {};
            }
            window[globalVarForAllGrids][gridName] = gridProcessor;
            setupSubmitReset(wiceGridContainer, gridProcessor);
            setupCsvExport(wiceGridContainer, gridProcessor);
            setupHidingShowingOfFilterRow(wiceGridContainer);
            setupShowingAllRecords(wiceGridContainer, gridProcessor);
            setupMultiSelectToggle(wiceGridContainer);
            setupAutoreloadsForInternalFilters(wiceGridContainer, gridProcessor);
            return setupBulkToggleForActionColumn(wiceGridContainer);
          });
          setupAutoreloadsForExternalFilters();
          setupExternalSubmitReset();
          setupExternalCsvExport();
          setupDatepicker();
          return setupMultiSelectToggle($(".wg-detached-filter"));
        };
        moveDateBoundIfInvalidPeriod = function(dataFieldNameWithTheOtherDatepicker, datepickerHiddenField, selectedDate, dateFormat, predicate) {
          var _datepickerId, datepickerId, theOtherDate, theOtherDatepicker;
          if ((datepickerId = datepickerHiddenField.data(dataFieldNameWithTheOtherDatepicker)) && (theOtherDatepicker = $(_datepickerId = "#" + datepickerId)) && (theOtherDate = theOtherDatepicker.datepicker("getDate")) && predicate(theOtherDate, selectedDate)) {
            theOtherDatepicker.datepicker("setDate", selectedDate);
            return theOtherDatepicker.next().next().html($.datepicker.formatDate(dateFormat, selectedDate));
          }
        };
        setupDatepicker = function() {
          if ($(".date-filter.wg-jquery-datepicker").length !== 0) {
            setupJqueryUiDatepicker();
          }
          if ($(".date-filter.wg-bootstrap-datepicker").length !== 0) {
            return setupBootstrapDatepicker();
          }
        };
        setupBootstrapDatepicker = function() {
          if (!$.fn.datepicker) {
            alert(`Seems like you do not have Bootstrap datepicker gem (https://github.com/Nerian/bootstrap-datepicker-rails)
installed. Either install it pick another filter with :filter_type.`);
            return;
          }
          return $(".date-filter.wg-bootstrap-datepicker input:text[data-provide=datepicker]").each(function(index, dateField) {
            return $(dateField).datepicker().on("hide", function(event) {
              var $self, $to, eventToTriggerOnChange;
              $self = $(event.currentTarget);
              eventToTriggerOnChange = $self.data("close-calendar-event-name");
              if (eventToTriggerOnChange) {
                return $self.trigger(eventToTriggerOnChange);
              } else if ($self.attr("id").split("_").pop() === "fr") {
                $to = $self.parent().next().find("input:text.check-for-bsdatepicker");
                if ($to.length > 0) {
                  return $to.datepicker("show");
                }
              }
            });
          });
        };
        setupJqueryUiDatepicker = function() {
          var locale;
          if (!$.datepicker) {
            alert(`Seems like you do not have jQuery datepicker (http://jqueryui.com/demos/datepicker/)
installed. Either install it pick another filter with :filter_type.`);
          }
          if (locale = $(".date-filter.wg-jquery-datepicker input[type=hidden]").data("locale")) {
            $.datepicker.setDefaults($.datepicker.regional[locale]);
          }
          return $(".date-filter.wg-jquery-datepicker .date-label").each(function(index, removeLink) {
            var dateFormat, datepickerContainer, datepickerHiddenField, eventToTriggerOnChange, labelText, newlyAdded, that, yearRange;
            datepickerHiddenField = $("#" + $(removeLink).data("dom-id"));
            eventToTriggerOnChange = datepickerHiddenField.data("close-calendar-event-name");
            $(removeLink).click(function(event) {
              $(this).html("");
              datepickerHiddenField.val("");
              if (eventToTriggerOnChange) {
                datepickerHiddenField.trigger(eventToTriggerOnChange);
              }
              event.preventDefault();
              return false;
            });
            that = this;
            dateFormat = datepickerHiddenField.data("date-format");
            yearRange = datepickerHiddenField.data("date-year-range");
            labelText = datepickerHiddenField.data("button-text");
            datepickerHiddenField.datepicker({
              firstDay: 1,
              dateFormat,
              changeMonth: true,
              changeYear: true,
              yearRange,
              onSelect: function(dateText, inst) {
                var selectedDate;
                selectedDate = $(this).datepicker("getDate");
                moveDateBoundIfInvalidPeriod("the-other-datepicker-id-to", datepickerHiddenField, selectedDate, dateFormat, function(theOther, selected) {
                  return theOther < selected;
                });
                moveDateBoundIfInvalidPeriod("the-other-datepicker-id-from", datepickerHiddenField, selectedDate, dateFormat, function(theOther, selected) {
                  return theOther > selected;
                });
                $(that).html(dateText);
                if (eventToTriggerOnChange) {
                  return datepickerHiddenField.trigger(eventToTriggerOnChange);
                }
              }
            });
            datepickerContainer = datepickerHiddenField.parent();
            $(removeLink).before(` <i class="fa fa-calendar ui-datepicker-trigger" title="${labelText}" ></i> `);
            newlyAdded = $(".fa-calendar", datepickerContainer);
            return newlyAdded.click(function() {
              return datepickerHiddenField.datepicker("show");
            });
          });
        };
        setupHidingShowingOfFilterRow = function(wiceGridContainer) {
          var filterRow, hideFilter, showFilter;
          hideFilter = ".wg-hide-filter";
          showFilter = ".wg-show-filter";
          filterRow = ".wg-filter-row";
          $(hideFilter, wiceGridContainer).click(function() {
            $(this).hide();
            $(showFilter, wiceGridContainer).show();
            return $(filterRow, wiceGridContainer).hide();
          });
          return $(showFilter, wiceGridContainer).click(function() {
            $(this).hide();
            $(hideFilter, wiceGridContainer).show();
            return $(filterRow, wiceGridContainer).show();
          });
        };
        setupCsvExport = function(wiceGridContainer, gridProcessor) {
          return $(".export-to-csv-button", wiceGridContainer).click(function() {
            return gridProcessor.exportToCsv();
          });
        };
        setupSubmitReset = function(wiceGridContainer, gridProcessor) {
          $(".submit", wiceGridContainer).click(function() {
            return gridProcessor.process();
          });
          $(".reset", wiceGridContainer).click(function() {
            return gridProcessor.reset();
          });
          return $(".wg-filter-row input[type=text], .wg-filter-row input:text[data-provide=datepicker]", wiceGridContainer).keydown(function(event) {
            if (event.keyCode === 13) {
              event.preventDefault();
              return gridProcessor.process();
            }
          });
        };
        SetEnd = function(txt) {
          var FieldRange, length;
          if (txt.createTextRange) {
            FieldRange = txt.createTextRange();
            FieldRange.moveStart("character", txt.value.length);
            FieldRange.collapse();
            FieldRange.select();
          } else {
            txt.focus();
            length = txt.value.length;
            txt.setSelectionRange(length, length);
          }
        };
        focusElementIfNeeded = function(focusId) {
          var elToFocus, elements;
          elements = $("#" + focusId);
          if (elToFocus = elements[0]) {
            return SetEnd(elToFocus);
          }
        };
        setupAutoreloadsForInternalFilters = function(wiceGridContainer, gridProcessor) {
          $("select.auto-reload, input.native-datepicker.auto-reload", wiceGridContainer).change(function() {
            return gridProcessor.process();
          });
          $("input.auto-reload", wiceGridContainer).keyup(function(event) {
            if (isKeySignificant(event.which)) {
              return gridProcessor.setProcessTimer(this.id);
            }
          });
          $("input.negation-checkbox.auto-reload", wiceGridContainer).click(function() {
            return gridProcessor.process();
          });
          return $(document).bind("wg:calendarChanged_" + gridProcessor.name, function() {
            return gridProcessor.process();
          });
        };
        isKeySignificant = function(keyCode, func) {
          return [37, 38, 39, 40, 9, 27].indexOf(keyCode) === -1;
        };
        setupAutoreloadsForExternalFilters = function() {
          return $(".wg-detached-filter").each(function(index, detachedFilterContainer) {
            var gridProcessor;
            gridProcessor = getGridProcessorForElement(detachedFilterContainer);
            if (gridProcessor) {
              $("select.auto-reload, input.native-datepicker.auto-reload", detachedFilterContainer).change(function() {
                return gridProcessor.process();
              });
              $("input.auto-reload", detachedFilterContainer).keyup(function(event) {
                if (isKeySignificant(event.which)) {
                  return gridProcessor.setProcessTimer(this.id);
                }
              });
              return $("input.negation-checkbox.auto-reload", detachedFilterContainer).click(function() {
                return gridProcessor.process();
              });
            }
          });
        };
        setupShowingAllRecords = function(wiceGridContainer, gridProcessor) {
          return $(".wg-show-all-link, .wg-back-to-pagination-link", wiceGridContainer).click(function(event) {
            var confirmationMessage, gridState, reloadGrid;
            event.preventDefault();
            gridState = $(this).data("grid-state");
            confirmationMessage = $(this).data("confim-message");
            reloadGrid = function() {
              return gridProcessor.reloadPageForGivenGridState(gridState);
            };
            if (confirmationMessage) {
              if (confirm(confirmationMessage)) {
                return reloadGrid();
              }
            } else {
              return reloadGrid();
            }
          });
        };
        setupMultiSelectToggle = function(wiceGridContainer) {
          $(".expand-multi-select-icon", wiceGridContainer).click(function() {
            $(this).prev().each(function(index, select) {
              return select.multiple = true;
            });
            $(this).next().show();
            return $(this).hide();
          });
          return $(".collapse-multi-select-icon", wiceGridContainer).click(function() {
            $(this).prev().prev().each(function(index, select) {
              return select.multiple = false;
            });
            $(this).prev().show();
            return $(this).hide();
          });
        };
        setupBulkToggleForActionColumn = function(wiceGridContainer) {
          $(".select-all", wiceGridContainer).click(function() {
            return $(".sel input", wiceGridContainer).prop("checked", true).trigger("change");
          });
          $(".deselect-all", wiceGridContainer).click(function() {
            return $(".sel input", wiceGridContainer).prop("checked", false).trigger("change");
          });
          return $(".wg-select-all", wiceGridContainer).click(function() {
            return $(".sel input", wiceGridContainer).prop("checked", $(this).prop("checked")).trigger("change");
          });
        };
        getGridProcessorForElement = function(element) {
          var gridName;
          gridName = $(element).data("grid-name");
          if (gridName && window[globalVarForAllGrids]) {
            return window[globalVarForAllGrids][gridName];
          } else {
            return null;
          }
        };
        setupExternalCsvExport = function() {
          return $(".wg-external-csv-export-button").each(function(index, externalCsvExportButton) {
            var gridProcessor;
            gridProcessor = getGridProcessorForElement(externalCsvExportButton);
            if (gridProcessor) {
              return $(externalCsvExportButton).click(function(event) {
                return gridProcessor.exportToCsv();
              });
            }
          });
        };
        setupExternalSubmitReset = function() {
          $(".wg-external-submit-button").each(function(index, externalSubmitButton) {
            var gridProcessor;
            gridProcessor = getGridProcessorForElement(externalSubmitButton);
            if (gridProcessor) {
              return $(externalSubmitButton).click(function(event) {
                gridProcessor.process();
                event.preventDefault();
                return false;
              });
            }
          });
          $(".wg-external-reset-button").each(function(index, externalResetButton) {
            var gridProcessor;
            gridProcessor = getGridProcessorForElement(externalResetButton);
            if (gridProcessor) {
              return $(externalResetButton).click(function(event) {
                gridProcessor.reset();
                event.preventDefault();
                return false;
              });
            }
          });
          return $(".wg-detached-filter").each(function(index, detachedFilterContainer) {
            var gridProcessor;
            gridProcessor = getGridProcessorForElement(detachedFilterContainer);
            if (gridProcessor) {
              return $("input[type=text], input:text[data-provide=datepicker]", this).keydown(function(event) {
                if (event.keyCode === 13) {
                  gridProcessor.process();
                  event.preventDefault();
                  return false;
                }
              });
            }
          });
        };
        window["getGridProcessorForElement"] = getGridProcessorForElement;
        window["initWiceGrid"] = initWiceGrid;
      }).call(exports);
    }
  });

  // app/assets/javascripts/src/wice_grid_saved_queries_init.js.coffee
  var require_wice_grid_saved_queries_init_js = __commonJS({
    "app/assets/javascripts/src/wice_grid_saved_queries_init.js.coffee"(exports) {
      (function() {
        var deleteQuery, loadQuery, onChangeToQueryList, saveQuery, savedQueriesInit;
        if (typeof Turbo !== "undefined" && Turbo !== null) {
          $(document).on("turbo:load", function() {
            return savedQueriesInit();
          });
        } else {
          $(document).on("page:load ready", function() {
            return savedQueriesInit();
          });
          $(document).on("turbolinks:render", function() {
            if (typeof Turbolinks !== "undefined" && Turbolinks !== null) {
              return savedQueriesInit();
            }
          });
        }
        savedQueriesInit = function() {
          $(".wice-grid-save-query-field").keydown(function(event) {
            if (event.keyCode === 13) {
              return saveQuery($(this).next(), event);
            }
          });
          $(".wice-grid-save-query-button").click(function(event) {
            return saveQuery(this, event);
          });
          $(".wice-grid-delete-query").click(function(event) {
            return deleteQuery(this, event);
          });
          return $(".wice-grid-query-load-link").click(function(event) {
            return loadQuery(this, event);
          });
        };
        loadQuery = function(loadLink, event) {
          var gridProcessor, queryId, request;
          if (gridProcessor = window.getGridProcessorForElement(loadLink)) {
            queryId = $(loadLink).data("query-id");
            request = gridProcessor.appendToUrl(gridProcessor.buildUrlWithParams(), gridProcessor.parameterNameForQueryLoading + encodeURIComponent(queryId));
            gridProcessor.visit(request);
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        };
        deleteQuery = function(deleteQueryButton, event) {
          var confirmation, gridProcessor, invokeConfirmation;
          confirmation = $(deleteQueryButton).data("wg-confirm");
          invokeConfirmation = confirmation ? function() {
            return confirm(confirmation);
          } : function() {
            return true;
          };
          if (invokeConfirmation() && (gridProcessor = window.getGridProcessorForElement(deleteQueryButton))) {
            jQuery.ajax({
              url: $(deleteQueryButton).attr("href"),
              async: true,
              dataType: "json",
              success: function(data, textStatus, jqXHR) {
                return onChangeToQueryList(data, gridProcessor.name);
              },
              type: "POST"
            });
          }
          event.preventDefault();
          event.stopPropagation();
          return false;
        };
        saveQuery = function(saveQueryButton, event) {
          var _saveQueryButton, basePathToQueryController, gridProcessor, gridState, inputField, inputIds, queryName, requestPath;
          if (gridProcessor = window.getGridProcessorForElement(saveQueryButton)) {
            _saveQueryButton = $(saveQueryButton);
            basePathToQueryController = _saveQueryButton.data("base-path-to-query-controller");
            gridState = _saveQueryButton.data("parameters");
            inputIds = _saveQueryButton.data("ids");
            inputField = _saveQueryButton.prev();
            if (inputIds instanceof Array) {
              inputIds.each(function(domId) {
                return gridState.push(["extra[" + domId + "]", $("#" + domId).val()]);
              });
            }
            queryName = inputField.val();
            requestPath = gridProcessor.gridStateToRequest(gridState);
            jQuery.ajax({
              url: basePathToQueryController,
              async: true,
              data: requestPath + "&query_name=" + encodeURIComponent(queryName),
              dataType: "json",
              success: function(data, textStatus, jqXHR) {
                return onChangeToQueryList(data, gridProcessor.name, queryName, inputField);
              },
              type: "POST"
            });
            event.preventDefault();
            return false;
          }
        };
        onChangeToQueryList = function(data, gridName, queryName, inputField) {
          var errorMessages, gridTitleId, notificationMessages, notificationMessagesDomId, queryListId;
          notificationMessagesDomId = `#${gridName}_notification_messages`;
          gridTitleId = `#${gridName}_title`;
          queryListId = `#${gridName}_query_list`;
          if (queryName) {
            inputField.val("");
          }
          if (errorMessages = data["error_messages"]) {
            return $(notificationMessagesDomId).text(errorMessages);
          } else {
            if (notificationMessages = data["notification_messages"]) {
              $(notificationMessagesDomId).text(notificationMessages);
            }
            if (queryName) {
              $(gridTitleId).html(`<h3>${queryName}</h3>`);
            }
            $(queryListId).replaceWith(data["query_list"]);
            if (jQuery.ui) {
              $(queryListId).effect("highlight");
            }
            $(".wice-grid-delete-query", $(queryListId)).click(function(event) {
              return deleteQuery(this, event);
            });
            return $(".wice-grid-query-load-link", $(queryListId)).click(function(event) {
              return loadQuery(this, event);
            });
          }
        };
      }).call(exports);
    }
  });

  // app/assets/javascripts/bundle.js
  var import_wice_grid_processor_js = __toESM(require_wice_grid_processor_js());
  var import_wice_grid_init_js = __toESM(require_wice_grid_init_js());
  var import_wice_grid_saved_queries_init_js = __toESM(require_wice_grid_saved_queries_init_js());
})();
