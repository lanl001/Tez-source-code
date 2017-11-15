"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('tez-ui/adapters/abstract', ['exports', 'ember', 'tez-ui/adapters/loader'], function (exports, _ember, _tezUiAdaptersLoader) {
  exports['default'] = _tezUiAdaptersLoader['default'].extend({
    serverName: null, //Must be set by inheriting classes

    host: _ember['default'].computed("serverName", function () {
      var serverName = this.get("serverName");
      return this.get('hosts.' + serverName);
    }),
    namespace: _ember['default'].computed("serverName", function () {
      var serverName = this.get("serverName");
      return this.get('env.app.namespaces.webService.' + serverName);
    }),
    pathTypeHash: _ember['default'].computed("serverName", function () {
      var serverName = this.get("serverName");
      return this.get('env.app.paths.' + serverName);
    }),

    ajaxOptions: function ajaxOptions(url, method, options) {
      options = options || {};
      options.crossDomain = true;
      options.xhrFields = {
        withCredentials: true
      };
      options.targetServer = this.get('serverName');
      return this._super(url, method, options);
    },

    pathForType: function pathForType(type) {
      var serverName = this.get("serverName"),
          path = this.get("pathTypeHash")[type];
      _ember['default'].assert('Path not found for type:' + type + ' to server:' + serverName, path);
      return path;
    },

    normalizeErrorResponse: function normalizeErrorResponse(status, headers, payload) {
      var response;

      if (payload && payload.exception && !payload.errors) {
        payload = payload.exception + '\n' + payload.message + '\n' + payload.javaClassName;
        response = this._super(status, headers, payload);
      } else {
        response = this._super(status, headers, payload);
        _ember['default'].set(response, '0.title', this.get("outOfReachMessage"));
      }

      return response;
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/ahs-app', ['exports', 'ember', 'tez-ui/adapters/timeline'], function (exports, _ember, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({
    namespace: _ember['default'].computed.alias("env.app.namespaces.webService.appHistory"),
    pathForType: function pathForType() {
      return "apps";
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/adapters/am", ["exports", "tez-ui/adapters/abstract"], function (exports, _tezUiAdaptersAbstract) {
  exports["default"] = _tezUiAdaptersAbstract["default"].extend({
    serverName: "am",
    outOfReachMessage: "Application Master (AM) is out of reach. Either it's down, or CORS is not enabled for YARN ResourceManager.",

    queryRecord: function queryRecord(store, type, query) {
      return this.query(store, type, query);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/app-rm', ['exports', 'tez-ui/adapters/rm'], function (exports, _tezUiAdaptersRm) {
  exports['default'] = _tezUiAdaptersRm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/app', ['exports', 'tez-ui/adapters/timeline'], function (exports, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/attempt-am', ['exports', 'tez-ui/adapters/am'], function (exports, _tezUiAdaptersAm) {
  exports['default'] = _tezUiAdaptersAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/attempt', ['exports', 'tez-ui/adapters/timeline'], function (exports, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/dag-am', ['exports', 'tez-ui/adapters/am'], function (exports, _tezUiAdaptersAm) {
  exports['default'] = _tezUiAdaptersAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/dag', ['exports', 'tez-ui/adapters/timeline'], function (exports, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/loader', ['exports', 'ember-data'], function (exports, _emberData) {

  var MoreString = more.String;

  exports['default'] = _emberData['default'].RESTAdapter.extend({
    _isLoader: true,

    buildURL: function buildURL(modelName, id, snapshot, requestType, query, params) {
      var url = this._super(modelName, id, snapshot, requestType, query);
      return params ? MoreString.fmt(url, params) : url;
    },

    _loaderAjax: function _loaderAjax(url, queryParams, nameSpace) {
      if (this.sortQueryParams && queryParams) {
        queryParams = this.sortQueryParams(queryParams);
      }

      // Inject nameSpace
      return this.ajax(url, 'GET', { data: queryParams }).then(function (data) {
        return {
          nameSpace: nameSpace,
          data: data
        };
      });
    },

    queryRecord: function queryRecord(store, type, query) {
      var queryParams = query.params,
          url = this.buildURL(type.modelName, query.id, null, null, queryParams, query.urlParams);
      return this._loaderAjax(url, queryParams, query.nameSpace);
    },

    query: function query(store, type, _query /*, recordArray*/) {
      var queryParams = _query.params,
          url = this.buildURL(type.modelName, null, null, 'query', queryParams, _query.urlParams);
      return this._loaderAjax(url, queryParams, _query.nameSpace);
    }

  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/adapters/rm", ["exports", "tez-ui/adapters/abstract"], function (exports, _tezUiAdaptersAbstract) {
  exports["default"] = _tezUiAdaptersAbstract["default"].extend({
    serverName: "rm",
    outOfReachMessage: "Resource Manager (RM) is out of reach. Either it's down, or CORS is not enabled."

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Any rm specific adapter changes must be added here
define('tez-ui/adapters/task-am', ['exports', 'tez-ui/adapters/am'], function (exports, _tezUiAdaptersAm) {
  exports['default'] = _tezUiAdaptersAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/task', ['exports', 'tez-ui/adapters/timeline'], function (exports, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/adapters/timeline", ["exports", "tez-ui/adapters/abstract"], function (exports, _tezUiAdaptersAbstract) {

  var MoreObject = more.Object;

  exports["default"] = _tezUiAdaptersAbstract["default"].extend({
    serverName: "timeline",
    outOfReachMessage: "Timeline server (ATS) is out of reach. Either it's down, or CORS is not enabled.",

    filters: {
      dagID: 'TEZ_DAG_ID',
      vertexID: 'TEZ_VERTEX_ID',
      taskID: 'TEZ_TASK_ID',
      attemptID: 'TEZ_TASK_ATTEMPT_ID',
      hiveQueryID: 'HIVE_QUERY_ID',
      appID: 'applicationId',

      dagName: 'dagName',
      user: "user",
      status: "status",
      callerID: "callerId"
    },

    stringifyFilters: function stringifyFilters(filters) {
      var filterStrs = [];

      MoreObject.forEach(filters, function (key, value) {
        filterStrs.push(key + ":" + value);
      });

      return filterStrs.join(",");
    },

    normalizeQuery: function normalizeQuery(query) {
      var primaryFilter = null,
          // Primary must have just one single filter
      secondaryFilters = {},
          normalQuery = {},
          filterStr;

      MoreObject.forEach(query, function (key, value) {
        var filter = this.get("filters." + key);

        if (filter) {
          if (!primaryFilter) {
            primaryFilter = {};
            primaryFilter[filter] = value;
          } else {
            secondaryFilters[filter] = value;
          }
        } else {
          normalQuery[key] = value;
        }
      }, this);

      // primaryFilter
      if (primaryFilter) {
        filterStr = this.stringifyFilters(primaryFilter);
      }
      if (filterStr) {
        normalQuery.primaryFilter = filterStr;
      }

      // secondaryFilters
      filterStr = this.stringifyFilters(secondaryFilters);
      if (filterStr) {
        normalQuery.secondaryFilter = filterStr;
      }

      // Limit
      normalQuery.limit = normalQuery.limit || this.get("env.app.rowLoadLimit");

      return normalQuery;
    },

    query: function query(store, type, _query /*, recordArray*/) {
      var queryParams = _query.params,
          url = this.buildURL(type.modelName, null, null, 'query', queryParams, _query.urlParams);

      if (_query) {
        queryParams = this.normalizeQuery(queryParams);
      }

      return this._loaderAjax(url, queryParams, _query.nameSpace);
    }
  });
});
/*global more*/

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/vertex-am', ['exports', 'tez-ui/adapters/am'], function (exports, _tezUiAdaptersAm) {
  exports['default'] = _tezUiAdaptersAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/adapters/vertex', ['exports', 'tez-ui/adapters/timeline'], function (exports, _tezUiAdaptersTimeline) {
  exports['default'] = _tezUiAdaptersTimeline['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/app', ['exports', 'ember', 'ember-resolver', 'ember/load-initializers', 'tez-ui/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _tezUiConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _tezUiConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _tezUiConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _tezUiConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'tez-ui/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _tezUiConfigEnvironment) {

  var name = _tezUiConfigEnvironment['default'].APP.name;
  var version = _tezUiConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('tez-ui/components/bs-accordion-item', ['exports', 'ember', 'ember-bootstrap/components/bs-accordion-item'], function (exports, _ember, _emberBootstrapComponentsBsAccordionItem) {
  exports['default'] = _emberBootstrapComponentsBsAccordionItem['default'];
});
define('tez-ui/components/bs-accordion', ['exports', 'ember', 'ember-bootstrap/components/bs-accordion'], function (exports, _ember, _emberBootstrapComponentsBsAccordion) {
  exports['default'] = _emberBootstrapComponentsBsAccordion['default'];
});
define('tez-ui/components/bs-alert', ['exports', 'ember', 'ember-bootstrap/components/bs-alert'], function (exports, _ember, _emberBootstrapComponentsBsAlert) {
  exports['default'] = _emberBootstrapComponentsBsAlert['default'];
});
define('tez-ui/components/bs-button-group', ['exports', 'ember', 'ember-bootstrap/components/bs-button-group'], function (exports, _ember, _emberBootstrapComponentsBsButtonGroup) {
  exports['default'] = _emberBootstrapComponentsBsButtonGroup['default'];
});
define('tez-ui/components/bs-button', ['exports', 'ember', 'ember-bootstrap/components/bs-button'], function (exports, _ember, _emberBootstrapComponentsBsButton) {
  exports['default'] = _emberBootstrapComponentsBsButton['default'];
});
define('tez-ui/components/bs-collapse', ['exports', 'ember', 'ember-bootstrap/components/bs-collapse'], function (exports, _ember, _emberBootstrapComponentsBsCollapse) {
  exports['default'] = _emberBootstrapComponentsBsCollapse['default'];
});
define('tez-ui/components/bs-dropdown-button', ['exports', 'ember', 'ember-bootstrap/components/bs-dropdown-button'], function (exports, _ember, _emberBootstrapComponentsBsDropdownButton) {
  exports['default'] = _emberBootstrapComponentsBsDropdownButton['default'];
});
define('tez-ui/components/bs-dropdown-menu', ['exports', 'ember', 'ember-bootstrap/components/bs-dropdown-menu'], function (exports, _ember, _emberBootstrapComponentsBsDropdownMenu) {
  exports['default'] = _emberBootstrapComponentsBsDropdownMenu['default'];
});
define('tez-ui/components/bs-dropdown-toggle', ['exports', 'ember', 'ember-bootstrap/components/bs-dropdown-toggle'], function (exports, _ember, _emberBootstrapComponentsBsDropdownToggle) {
  exports['default'] = _emberBootstrapComponentsBsDropdownToggle['default'];
});
define('tez-ui/components/bs-dropdown', ['exports', 'ember', 'ember-bootstrap/components/bs-dropdown'], function (exports, _ember, _emberBootstrapComponentsBsDropdown) {
  exports['default'] = _emberBootstrapComponentsBsDropdown['default'];
});
define('tez-ui/components/bs-form-element', ['exports', 'ember', 'ember-bootstrap/components/bs-form-element'], function (exports, _ember, _emberBootstrapComponentsBsFormElement) {
  exports['default'] = _emberBootstrapComponentsBsFormElement['default'];
});
define('tez-ui/components/bs-form-group', ['exports', 'ember', 'ember-bootstrap/components/bs-form-group'], function (exports, _ember, _emberBootstrapComponentsBsFormGroup) {
  exports['default'] = _emberBootstrapComponentsBsFormGroup['default'];
});
define('tez-ui/components/bs-form', ['exports', 'ember', 'ember-bootstrap/components/bs-form'], function (exports, _ember, _emberBootstrapComponentsBsForm) {
  exports['default'] = _emberBootstrapComponentsBsForm['default'];
});
define('tez-ui/components/bs-input', ['exports', 'ember', 'ember-bootstrap/components/bs-input'], function (exports, _ember, _emberBootstrapComponentsBsInput) {
  exports['default'] = _emberBootstrapComponentsBsInput['default'];
});
define('tez-ui/components/bs-modal-backdrop', ['exports', 'ember-bootstrap/components/bs-modal-backdrop'], function (exports, _emberBootstrapComponentsBsModalBackdrop) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalBackdrop['default'];
    }
  });
});
define('tez-ui/components/bs-modal-body', ['exports', 'ember', 'ember-bootstrap/components/bs-modal-body'], function (exports, _ember, _emberBootstrapComponentsBsModalBody) {
  exports['default'] = _emberBootstrapComponentsBsModalBody['default'];
});
define('tez-ui/components/bs-modal-dialog', ['exports', 'ember-bootstrap/components/bs-modal-dialog'], function (exports, _emberBootstrapComponentsBsModalDialog) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapComponentsBsModalDialog['default'];
    }
  });
});
define('tez-ui/components/bs-modal-footer', ['exports', 'ember', 'ember-bootstrap/components/bs-modal-footer'], function (exports, _ember, _emberBootstrapComponentsBsModalFooter) {
  exports['default'] = _emberBootstrapComponentsBsModalFooter['default'];
});
define('tez-ui/components/bs-modal-header', ['exports', 'ember', 'ember-bootstrap/components/bs-modal-header'], function (exports, _ember, _emberBootstrapComponentsBsModalHeader) {
  exports['default'] = _emberBootstrapComponentsBsModalHeader['default'];
});
define('tez-ui/components/bs-modal', ['exports', 'ember', 'ember-bootstrap/components/bs-modal'], function (exports, _ember, _emberBootstrapComponentsBsModal) {
  exports['default'] = _emberBootstrapComponentsBsModal['default'];
});
define('tez-ui/components/bs-select', ['exports', 'ember', 'ember-bootstrap/components/bs-select'], function (exports, _ember, _emberBootstrapComponentsBsSelect) {
  exports['default'] = _emberBootstrapComponentsBsSelect['default'];
});
define('tez-ui/components/bs-textarea', ['exports', 'ember', 'ember-bootstrap/components/bs-textarea'], function (exports, _ember, _emberBootstrapComponentsBsTextarea) {
  exports['default'] = _emberBootstrapComponentsBsTextarea['default'];
});
define('tez-ui/components/caller-info', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    type: null,
    info: null,

    codeMirror: null,

    classNames: ['caller-info'],

    mode: _ember['default'].computed("type", function () {
      switch (this.get("type")) {
        case 'Hive':
          return 'text/x-hive';
        case 'Pig':
          return 'text/x-pig';
        default:
          return 'text/x-sql';
      }
    }),

    _init: _ember['default'].on('didInsertElement', function () {
      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        var element = _ember['default'].$(this.get('element')).find('textarea')[0],
            codeMirror = CodeMirror.fromTextArea(element, {
          theme: 'default',
          indentUnit: 2,
          smartIndent: true,
          tabSize: 4,
          electricChars: true,
          lineWrapping: true,
          lineNumbers: true,
          readOnly: true,
          autofocus: false,
          dragDrop: false
        });

        this.set('codeMirror', codeMirror);

        this._modeChanged();
        this._infoChanged();
      });
    }),

    _modeChanged: _ember['default'].observer("mode", function () {
      this.get('codeMirror').setOption("mode", this.get("mode"));
    }),

    _infoChanged: _ember['default'].observer("info", function () {
      var codeMirror = this.get('codeMirror'),
          info = this.get('info') || '';

      if (this.get('codeMirror').getValue() !== info) {
        codeMirror.setValue(info);
      }
    })

  });
});
/*global CodeMirror*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Must be convert into an ember addon
define('tez-ui/components/column-selector', ['exports', 'ember', 'tez-ui/utils/misc'], function (exports, _ember, _tezUiUtilsMisc) {
  exports['default'] = _ember['default'].Component.extend({

    classNames: ['column-selector'],

    searchText: "",
    selectAll: false,

    content: null,

    options: _ember['default'].computed("content.columns", "content.visibleColumnIDs", function () {
      var group,
          highlight = false,
          visibleColumnIDs = this.get('content.visibleColumnIDs') || {};

      return this.get('content.columns').map(function (definition) {
        var css = '';

        highlight = highlight ^ _ember['default'].get(definition, "counterGroupName") !== group;
        group = _ember['default'].get(definition, "counterGroupName");

        if (highlight) {
          css += ' highlight';
        }
        if (group && (0, _tezUiUtilsMisc['default'])(group)) {
          css += ' per-io';
        }

        return _ember['default'].Object.create({
          id: _ember['default'].get(definition, "id"),
          displayText: _ember['default'].get(definition, "headerTitle"),
          css: css,
          selected: visibleColumnIDs[_ember['default'].get(definition, "id")]
        });
      });
    }),

    filteredOptions: _ember['default'].computed("options", "searchText", function () {
      var options = this.get('options'),
          searchText = this.get('searchText');

      if (!searchText) {
        return options;
      }

      return options.filter(function (option) {
        return option.get('displayText').match(searchText);
      });
    }),

    selectedColumnIDs: _ember['default'].computed("options", function () {
      var columnIds = {};
      this.get('options').forEach(function (option) {
        columnIds[option.get("id")] = option.get('selected');
      });

      return columnIds;
    }),

    _selectObserver: _ember['default'].observer('filteredOptions.@each.selected', function () {
      var selectedCount = 0;
      this.get('filteredOptions').forEach(function (option) {
        if (_ember['default'].get(option, 'selected')) {
          selectedCount++;
        }
      });
      this.set('selectAll', selectedCount > 0 && selectedCount === this.get('filteredOptions.length'));
    }),

    actions: {
      selectAll: function selectAll(checked) {
        this.get('filteredOptions').forEach(function (option) {
          _ember['default'].set(option, 'selected', checked);
        });
      },
      closeModal: function closeModal() {
        this.get("targetObject").send("closeModal");
      },
      ok: function ok() {
        this.get("targetObject").send("columnsSelected", this.get("selectedColumnIDs"));
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/dags-page-search', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['dags-page-search'],

    dagName: _ember['default'].computed.oneWay("tableDefinition.dagName"),
    dagID: _ember['default'].computed.oneWay("tableDefinition.dagID"),
    submitter: _ember['default'].computed.oneWay("tableDefinition.submitter"),
    status: _ember['default'].computed.oneWay("tableDefinition.status"),
    appID: _ember['default'].computed.oneWay("tableDefinition.appID"),
    callerID: _ember['default'].computed.oneWay("tableDefinition.callerID"),

    sendSearch: function sendSearch() {
      this.get('parentView').sendAction('search', {
        dagName: this.get("dagName"),
        dagID: this.get("dagID"),
        submitter: this.get("submitter"),
        status: this.get("status"),
        appID: this.get("appID"),
        callerID: this.get("callerID")
      });
    },

    actions: {
      statusChanged: function statusChanged(value) {
        this.set("status", value);
      },
      statusKeyPress: function statusKeyPress() {
        this.sendSearch();
      },
      search: function search() {
        this.sendSearch();
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/dags-pagination-ui', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    tableDefinition: null,
    dataProcessor: null,

    classNames: ['pagination-ui'],
    isVisible: _ember['default'].computed.alias('tableDefinition.enablePagination'),

    atFirst: _ember['default'].computed('tableDefinition.pageNum', function () {
      return this.get('tableDefinition.pageNum') === 1;
    }),

    rowCountOptions: _ember['default'].computed('tableDefinition.rowCountOptions', 'tableDefinition.rowCount', function () {
      var options = this.get('tableDefinition.rowCountOptions'),
          rowCount = this.get('tableDefinition.rowCount');

      return options.map(function (option) {
        return {
          value: option,
          selected: option === rowCount
        };
      });
    }),

    _possiblePages: _ember['default'].computed('tableDefinition.pageNum', 'tableDefinition.moreAvailable', 'dataProcessor.totalPages', function () {
      var pageNum = this.get('tableDefinition.pageNum'),
          totalPages = this.get('dataProcessor.totalPages'),
          possiblePages = [],
          startPage = 1,
          endPage = totalPages,
          delta = 0;

      if (this.get('tableDefinition.moreAvailable')) {
        totalPages++;
      }

      if (totalPages > 1) {
        startPage = pageNum - 1;
        endPage = pageNum + 1;

        if (startPage < 1) {
          delta = 1 - startPage;
        } else if (endPage > totalPages) {
          delta = totalPages - endPage;
        }

        startPage += delta;
        endPage += delta;
      }

      startPage = Math.max(startPage, 1);
      endPage = Math.min(endPage, totalPages);

      while (startPage <= endPage) {
        possiblePages.push({
          isCurrent: startPage === pageNum,
          isLoadPage: startPage === totalPages,
          pageNum: startPage++
        });
      }

      return possiblePages;
    }),

    actions: {
      rowSelected: function rowSelected(value) {
        value = parseInt(value);
        if (this.get('tableDefinition.rowCount') !== value) {
          this.get('parentView').send('rowChanged', value);
        }
      },
      changePage: function changePage(value) {
        if (value === 1) {
          this.get('parentView').sendAction('reload');
        } else if (this.get('dataProcessor.totalPages') < value) {
          this.get('parentView').sendAction('loadPage', value);
        } else {
          this.get('parentView').send('pageChanged', value);
        }
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/data-visual', ['exports', 'ember-cli-d3/components/data-visual'], function (exports, _emberCliD3ComponentsDataVisual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliD3ComponentsDataVisual['default'];
    }
  });
});
define('tez-ui/components/date-formatter', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    classNames: ["date-formatter"],

    content: null,

    env: _ember['default'].inject.service('env'),
    timeZone: _ember['default'].computed.oneWay('env.app.timeZone')

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-breadcrumbs', ['exports', 'em-helpers/components/em-breadcrumbs'], function (exports, _emHelpersComponentsEmBreadcrumbs) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emHelpersComponentsEmBreadcrumbs['default'];
    }
  });
});
define('tez-ui/components/em-progress', ['exports', 'em-helpers/components/em-progress'], function (exports, _emHelpersComponentsEmProgress) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emHelpersComponentsEmProgress['default'];
    }
  });
});
define("tez-ui/components/em-swimlane-blocking-event", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    process: null,
    blocking: null,

    processor: null,

    classNames: ["em-swimlane-blocking-event"],

    blockingEvent: _ember["default"].computed("process.blockingEventName", "process.events.@each.name", function () {
      var events = this.get("process.events"),
          blockingEventName = this.get("process.blockingEventName");

      return events.find(function (event) {
        return event.name === blockingEventName;
      });
    }),

    didInsertElement: _ember["default"].observer("blockingEvent.time", "processor.timeWindow", function () {
      var blockTime = this.get("blockingEvent.time"),
          blockerEventHeight;

      if (blockTime && this.get("blocking.endEvent.time") >= blockTime) {
        blockerEventHeight = (this.get("blocking.index") - this.get("process.index")) * 30;

        _ember["default"].run.scheduleOnce('afterRender', this, function () {
          this.$().css({
            "left": this.get("processor").timeToPositionPercent(blockTime) + "%"
          });
          this.$(".event-line").css({
            "height": blockerEventHeight + "px",
            "border-color": this.get("process").getColor()
          });
        });
      }
    }),

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "blocking-event", this.get("process"), {
        mouseEvent: mouseEvent,
        blocking: this.get("blocking"),
        blockingEvent: this.get("blockingEvent")
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-swimlane-consolidated-process', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({

    process: null,
    processor: null,
    focusedProcess: null,

    classNames: ["em-swimlane-consolidated-process"],
    classNameBindings: ['focused'],

    focused: _ember['default'].computed("process", "focusedProcess", function () {
      return this.get("process") === this.get("focusedProcess");
    }),

    fromPos: _ember['default'].computed("process.consolidateStartTime", "processor.timeWindow", function () {
      var time = this.get("process.consolidateStartTime");
      if (time) {
        return this.get("processor").timeToPositionPercent(time);
      }
    }),

    toPos: _ember['default'].computed("process.consolidateEndTime", "processor.timeWindow", function () {
      var time = this.get("process.consolidateEndTime");
      if (time) {
        return this.get("processor").timeToPositionPercent(time);
      }
    }),

    didInsertElement: _ember['default'].observer("fromPos", "toPos", function () {
      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        var fromPos = this.get("fromPos"),
            toPos = this.get("toPos"),
            thisElement = this.$();

        if (fromPos && toPos) {
          thisElement.show();
          thisElement.css({
            left: fromPos + "%",
            right: 100 - toPos + "%",
            "background-color": this.get("process").getConsolidateColor(),
            "z-index": parseInt(toPos - fromPos)
          });
        } else {
          thisElement.hide();
        }
      });
    }),

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      var fromPos = this.get("fromPos") || 0,
          toPos = this.get("toPos") || 0;

      this.sendAction(name, "consolidated-process", this.get("process"), {
        mouseEvent: mouseEvent,
        contribution: parseInt(toPos - fromPos)
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-event-bar", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    bar: null,
    barIndex: 0,

    process: null,
    processor: null,

    classNames: ["em-swimlane-event-bar"],

    fromEvent: _ember["default"].computed("process.events.@each.name", "bar.fromEvent", function () {
      var events = this.get("process.events"),
          fromEventName = this.get("bar.fromEvent");
      return events.find(function (event) {
        return event.name === fromEventName;
      });
    }),
    toEvent: _ember["default"].computed("process.events.@each.name", "bar.toEvent", function () {
      var events = this.get("process.events"),
          toEventName = this.get("bar.toEvent");
      return events.find(function (event) {
        return event.name === toEventName;
      });
    }),

    didInsertElement: _ember["default"].observer("fromEvent.time", "toEvent.time", "barIndex", "processor.timeWindow", function () {

      var processor = this.get("processor"),
          fromEventPos = processor.timeToPositionPercent(this.get("fromEvent.time")),
          toEventPos = processor.timeToPositionPercent(this.get("toEvent.time")),
          color = this.get("bar.color") || this.get("process").getBarColor(this.get("barIndex"));

      _ember["default"].run.scheduleOnce('afterRender', this, function () {
        if (fromEventPos && toEventPos) {
          this.$().show();
          this.$(".event-bar").css({
            left: fromEventPos + "%",
            right: 100 - toEventPos + "%",
            "background-color": color,
            "border-color": this.get("process").getColor()
          });
        } else {
          this.$().hide();
        }
      });
    }),

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "event-bar", this.get("process"), {
        mouseEvent: mouseEvent,
        bar: this.get("bar"),
        fromEvent: this.get("fromEvent"),
        toEvent: this.get("toEvent")
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-event", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    process: null,
    event: null,

    processor: null,

    classNames: ["em-swimlane-event"],

    didInsertElement: _ember["default"].observer("event.time", "processor.timeWindow", function () {
      var color = this.get("process").getColor();

      _ember["default"].run.scheduleOnce('afterRender', this, function () {
        this.$(".event-line").css("border-color", color);
        this.$(".event-bubble").css("border-color", color);

        this.$().css({
          "left": this.get("processor").timeToPositionPercent(this.get("event.time")) + "%"
        });
      });
    }),

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "event", this.get("process"), {
        mouseEvent: mouseEvent,
        events: [this.get("event")]
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-process-line", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    process: null,
    processor: null,

    didInsertElement: _ember["default"].observer("process.startEvent.time", "process.endEvent.time", "processor.timeWindow", function () {
      var processor = this.get("processor"),
          startPos = processor.timeToPositionPercent(this.get("process.startEvent.time")),
          endPos = processor.timeToPositionPercent(this.get("process.endEvent.time"));

      _ember["default"].run.scheduleOnce('afterRender', this, function () {
        this.$(".process-line").css({
          left: startPos + "%",
          right: 100 - endPos + "%",
          "background-color": this.get("process").getColor()
        });
      });
    }),

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "process-line", this.get("process"), {
        mouseEvent: mouseEvent
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-process-name", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    process: null,

    classNames: ["em-swimlane-process-name"],

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "process-name", this.get("process"), {
        mouseEvent: mouseEvent
      });
    },

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-process-visual", ["exports", "ember"], function (exports, _ember) {

  var BUBBLE_DIA = 10; // Same as that in css

  exports["default"] = _ember["default"].Component.extend({

    process: null,
    processor: null,
    focusedProcess: null,

    classNames: ["em-swimlane-process-visual"],

    actions: {
      showTooltip: function showTooltip(type, process, options) {
        var _this = this;

        if (type === "event") {
          (function () {
            var clientX = options.mouseEvent.clientX,
                events = process.get("events"),
                eventsUnderMouse = [];

            _this.$(".em-swimlane-event").each(function (index) {
              var offsetLeft = _ember["default"].$(this).offset().left;

              if (clientX >= offsetLeft - BUBBLE_DIA && clientX <= offsetLeft + BUBBLE_DIA) {
                eventsUnderMouse.push(events[index]);
              }
            });

            if (events.length) {
              eventsUnderMouse.sort(function (eventA, eventB) {
                return eventA.time - eventB.time;
              });
              options.events = eventsUnderMouse;
            }
          })();
        }

        this.sendAction("showTooltip", type, process, options);
      },

      hideTooltip: function hideTooltip(type, process, options) {
        this.sendAction("hideTooltip", type, process, options);
      },
      click: function click(type, process, options) {
        this.sendAction("click", type, process, options);
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-swimlane-ruler', ['exports', 'ember', 'moment'], function (exports, _ember, _moment) {

  var DEFAULT_MARK_COUNT = 10;

  exports['default'] = _ember['default'].Component.extend({

    zoom: null,
    processor: null,
    scroll: 0,

    classNames: ["em-swimlane-ruler"],

    markDef: _ember['default'].computed("processor.timeWindow", "zoom", function () {
      var markCount = parseInt(DEFAULT_MARK_COUNT * this.get("zoom") / 100),
          timeWindow = this.get("processor.timeWindow"),
          duration = _moment['default'].duration(parseInt(timeWindow / markCount)),
          markUnit = "Milliseconds",
          markBaseValue = 0,
          markWindow = 0,
          styleWidth = 0;

      if (markBaseValue = duration.years()) {
        markUnit = "Years";
      } else if (markBaseValue = duration.months()) {
        markUnit = "Months";
      } else if (markBaseValue = duration.days()) {
        markUnit = "Days";
      } else if (markBaseValue = duration.hours()) {
        markUnit = "Hours";
      } else if (markBaseValue = duration.minutes()) {
        markUnit = "Minutes";
      } else if (markBaseValue = duration.seconds()) {
        markUnit = "Seconds";
      } else {
        markBaseValue = duration.milliseconds();
      }

      if (markBaseValue > 10) {
        markBaseValue = Math.floor(markBaseValue / 10) * 10;
      }

      markWindow = _moment['default'].duration(markBaseValue, markUnit.toLowerCase()).asMilliseconds();
      styleWidth = markWindow / timeWindow * 100;

      return {
        unit: markUnit,
        baseValue: markBaseValue,
        style: _ember['default'].String.htmlSafe('width: ' + styleWidth + '%;'),
        count: parseInt(100 / styleWidth * 1.1)
      };
    }),

    unitTextStyle: _ember['default'].computed("scroll", function () {
      var scroll = this.get("scroll");
      return _ember['default'].String.htmlSafe('left: ' + scroll + 'px;');
    }),

    marks: _ember['default'].computed("processor.timeWindow", "markDef", function () {
      var def = this.get("markDef"),
          baseValue = def.baseValue,
          marks = [];

      for (var i = 0, count = def.count; i < count; i++) {
        marks.push({
          duration: parseInt(baseValue * i)
        });
      }

      return marks;
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/components/em-swimlane-vertex-name", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    process: null,

    classNames: ["em-swimlane-vertex-name"],

    sendMouseAction: function sendMouseAction(name, mouseEvent) {
      this.sendAction(name, "process-name", this.get("process"), {
        mouseEvent: mouseEvent
      });
    },

    progressText: _ember["default"].computed("process.vertex.finalStatus", "process.vertex.progress", function () {
      if (this.get("process.vertex.finalStatus") === "RUNNING") {
        var progress = this.get("process.vertex.progress");
        if (!isNaN(progress)) {
          var percent = parseInt(progress * 100);
          return percent + "%";
        }
      }
    }),

    mouseEnter: function mouseEnter(mouseEvent) {
      this.sendMouseAction("showTooltip", mouseEvent);
    },

    mouseLeave: function mouseLeave(mouseEvent) {
      this.sendMouseAction("hideTooltip", mouseEvent);
    },

    mouseUp: function mouseUp(mouseEvent) {
      this.sendMouseAction("click", mouseEvent);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-swimlane', ['exports', 'ember', 'tez-ui/utils/processor', 'tez-ui/utils/process'], function (exports, _ember, _tezUiUtilsProcessor, _tezUiUtilsProcess) {
  exports['default'] = _ember['default'].Component.extend({

    classNames: ["em-swimlane"],

    processes: [],
    processor: _tezUiUtilsProcessor['default'].create(),

    nameComponent: "em-swimlane-process-name",
    visualComponent: "em-swimlane-process-visual",

    tooltipContents: null,
    focusedProcess: null,
    scroll: 0,

    consolidate: false,

    zoom: 100,

    startTime: _ember['default'].computed("processes.@each.startEvent", function () {
      var startTime = this.get("processes.0.startEvent.time");
      this.get("processes").forEach(function (process) {
        var time = process.get("startEvent.time");
        if (startTime > time) {
          startTime = time;
        }
      });
      return startTime;
    }),
    endTime: _ember['default'].computed("processes.@each.endEvent", function () {
      var endTime = this.get("processes.0.endEvent.time");
      this.get("processes").forEach(function (process) {
        var time = process.get("endEvent.time");
        if (endTime < time) {
          endTime = time;
        }
      });
      return endTime;
    }),

    processorSetup: _ember['default'].on("init", _ember['default'].observer("startTime", "endTime", "processes.length", function () {
      this.get("processor").setProperties({
        startTime: this.get("startTime"),
        endTime: this.get("endTime"),
        processCount: this.get("processes.length")
      });
    })),

    didInsertElement: function didInsertElement() {
      _ember['default'].run.scheduleOnce('afterRender', this, function () {
        this.onZoom();
        this.listenScroll();
      });
    },

    onZoom: _ember['default'].observer("zoom", function () {
      var zoom = this.get("zoom");
      this.$(".zoom-panel").css("width", zoom + '%');
    }),

    listenScroll: function listenScroll() {
      var that = this;
      this.$(".process-visuals").scroll(function () {
        that.set("scroll", _ember['default'].$(this).scrollLeft());
      });
    },

    willDestroy: function willDestroy() {
      // Release listeners
    },

    normalizedProcesses: _ember['default'].computed("processes.@each.blockers", function () {
      var processes = this.get("processes"),
          normalizedProcesses,
          idHash = {},
          containsBlockers = false,
          processor = this.get("processor");

      // Validate and reset blocking
      processes.forEach(function (process) {
        if (!(process instanceof _tezUiUtilsProcess['default'])) {
          _ember['default'].Logger.error("em-swimlane : Unknown type, must be of type Process");
        }

        if (process.get("blockers.length")) {
          containsBlockers = true;
        }
        process.set("blocking", _ember['default'].A());
      });

      if (containsBlockers) {
        normalizedProcesses = [];

        // Recreate blocking list
        processes.forEach(function (process) {
          var blockers = process.get("blockers");
          if (blockers) {
            blockers.forEach(function (blocker) {
              blocker.get("blocking").push(process);
            });
          }
        });

        // Give an array of the processes in blocking order
        processes.forEach(function (process) {
          if (process.get("blocking.length") === 0) {
            // The root processes
            normalizedProcesses.push(process);
            normalizedProcesses.push.apply(normalizedProcesses, process.getAllBlockers());
          }
        });
        normalizedProcesses.reverse();
        normalizedProcesses = normalizedProcesses.filter(function (process, index) {
          // Filters out the recurring processes in the list (after graph traversal), we just
          // need the top processes
          var id = process.get("_id");
          if (idHash[id] === undefined) {
            idHash[id] = index;
          }
          return idHash[id] === index;
        });
      } else {
        normalizedProcesses = processes;
      }

      // Set process colors & index
      normalizedProcesses.forEach(function (process, index) {
        process.setProperties({
          color: processor.createProcessColor(index),
          index: index
        });
      });

      return _ember['default'].A(normalizedProcesses);
    }),

    actions: {
      showTooltip: function showTooltip(type, process, options) {
        this.set("tooltipContents", process.getTooltipContents(type, options));
        this.set("focusedProcess", process);
      },
      hideTooltip: function hideTooltip() {
        this.set("tooltipContents", null);
        this.set("focusedProcess", null);
      },
      click: function click(type, process, options) {
        this.sendAction("click", type, process, options);
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-table-cell', ['exports', 'em-table/components/em-table-cell'], function (exports, _emTableComponentsEmTableCell) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableCell['default'];
    }
  });
});
define('tez-ui/components/em-table-column', ['exports', 'em-table/components/em-table-column'], function (exports, _emTableComponentsEmTableColumn) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableColumn['default'];
    }
  });
});
define('tez-ui/components/em-table-header-cell', ['exports', 'em-table/components/em-table-header-cell'], function (exports, _emTableComponentsEmTableHeaderCell) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableHeaderCell['default'];
    }
  });
});
define('tez-ui/components/em-table-linked-cell', ['exports', 'em-table/components/em-table-linked-cell'], function (exports, _emTableComponentsEmTableLinkedCell) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableLinkedCell['default'];
    }
  });
});
define('tez-ui/components/em-table-pagination-ui', ['exports', 'em-table/components/em-table-pagination-ui'], function (exports, _emTableComponentsEmTablePaginationUi) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTablePaginationUi['default'];
    }
  });
});
define('tez-ui/components/em-table-progress-cell', ['exports', 'em-table/components/em-table-progress-cell'], function (exports, _emTableComponentsEmTableProgressCell) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableProgressCell['default'];
    }
  });
});
define('tez-ui/components/em-table-search-ui', ['exports', 'em-table/components/em-table-search-ui'], function (exports, _emTableComponentsEmTableSearchUi) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTableSearchUi['default'];
    }
  });
});
define("tez-ui/components/em-table-status-cell", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({

    content: null,

    classNames: ["em-table-status-cell"],

    statusName: _ember["default"].computed("content", function () {
      var status = this.get("content");

      if (status) {
        status = status.toString().dasherize();
        status = "status-" + status;
      }
      return status;
    })
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/em-table', ['exports', 'em-table/components/em-table'], function (exports, _emTableComponentsEmTable) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableComponentsEmTable['default'];
    }
  });
});
define('tez-ui/components/em-tgraph', ['exports', 'em-tgraph/components/em-tgraph'], function (exports, _emTgraphComponentsEmTgraph) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTgraphComponentsEmTgraph['default'];
    }
  });
});
define("tez-ui/components/em-tooltip", ["exports", "ember"], function (exports, _ember) {

  var TIP_PADDING = 15,
      // As in em-tooltip.css
  FADE_TIME = 150;

  exports["default"] = _ember["default"].Component.extend({

    title: null,
    description: null,
    properties: null,
    contents: null,

    classNames: ["em-tooltip"],
    classNameBindings: ["arrowPos"],

    x: 0,
    y: 0,

    _contents: null,
    show: false,
    arrowPos: null,

    window: null,
    tip: null,
    bubbles: null,

    _contentObserver: _ember["default"].on("init", _ember["default"].observer("title", "description", "properties", "contents", function () {
      var contents,
          tip = this.get("tip");

      if (this.get("title") || this.get("description") || this.get("properties")) {
        contents = [{
          title: this.get("title"),
          description: this.get("description"),
          properties: this.get("properties")
        }];
      } else if (Array.isArray(this.get("contents"))) {
        contents = this.get("contents");
      }

      this.set("show", false);
      if (contents) {
        if (tip) {
          tip.hide();
        }
        this.set("_contents", contents);

        _ember["default"].run.later(this, function () {
          this.set("bubbles", this.$(".bubble"));
          this.set("show", true);
          this.renderTip();
        });
      } else if (tip) {
        tip.stop(true).fadeOut(FADE_TIME);
      }
    })),

    didInsertElement: function didInsertElement() {
      _ember["default"].run.scheduleOnce('afterRender', this, function () {
        this.setProperties({
          window: _ember["default"].$(window),
          tip: this.$()
        });
      });
      _ember["default"].$(document).on("mousemove", this, this.onMouseMove);
    },

    willDestroyElement: function willDestroyElement() {
      _ember["default"].$(document).off("mousemove", this.onMouseMove);
    },

    onMouseMove: function onMouseMove(event) {
      event.data.setProperties({
        x: event.clientX,
        y: event.clientY
      });

      if (_ember["default"].get(event, "data.tip")) {
        event.data.renderTip();
      }
    },

    getBubbleOffset: function getBubbleOffset(x, bubbleElement, winWidth) {
      var bubbleWidth = Math.max(bubbleElement.width(), 0),
          bubbleOffset = bubbleWidth >> 1;

      if (x - bubbleOffset - TIP_PADDING < 0) {
        bubbleOffset = x - TIP_PADDING;
      } else if (x + TIP_PADDING + bubbleOffset > winWidth) {
        bubbleOffset = x - (winWidth - bubbleWidth) + TIP_PADDING;
      }

      return -bubbleOffset;
    },

    renderTip: function renderTip() {
      var _this = this;

      if (this.get("show")) {
        (function () {
          var x = _this.get("x"),
              y = _this.get("y"),
              winHeight = _this.get("window").height(),
              winWidth = _this.get("window").width(),
              showAbove = y < winHeight >> 1,
              that = _this,
              tip = _this.get("tip");

          if (x > TIP_PADDING && x < winWidth - TIP_PADDING) {
            if (!showAbove) {
              y -= tip.height();
              _this.set("arrowPos", "below");
            } else {
              _this.set("arrowPos", "above");
            }
          } else {
            _this.set("arrowPos", null);
          }

          tip.css({
            left: x + "px",
            top: y + "px"
          });

          tip.fadeIn({
            duration: FADE_TIME,
            start: function start() {
              that.get("bubbles").each(function () {
                var bubble = _ember["default"].$(this),
                    bubbleOffset = that.getBubbleOffset(x, bubble, winWidth);
                bubble.css("left", bubbleOffset + "px");
              });
            }
          });
        })();
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('tez-ui/components/error-bar', ['exports', 'ember'], function (exports, _ember) {

  var DISPLAY_TIME = 30 * 1000;

  exports['default'] = _ember['default'].Component.extend({

    error: null,

    visible: false,
    detailsAvailable: false,

    classNames: ['error-bar'],
    classNameBindings: ['visible', 'detailsAvailable'],

    code: null,
    message: null,
    details: null,
    stack: null,

    showDetails: false,

    displayTimerId: 0,

    _errorObserver: _ember['default'].observer("error", function () {
      var error = this.get("error"),
          code = _ember['default'].get(error, "errors.0.status"),
          title = _ember['default'].get(error, "errors.0.title"),
          message = error.message || "Error",
          details = _ember['default'].get(error, "errors.0.detail") || "",
          stack = error.stack,
          lineEndIndex = Math.min(message.indexOf('\n'), message.indexOf('<br'));

      if (code === "0") {
        code = "";
      }

      if (title) {
        message += ". " + title;
      }

      if (lineEndIndex > 0) {
        if (details) {
          details = "\n" + details;
        }
        details = message.substr(lineEndIndex) + details;
        message = message.substr(0, lineEndIndex);
      }

      if (details) {
        details += "\n";
      }

      if (error) {
        this.setProperties({
          code: code,
          message: message,
          details: details,
          stack: stack,

          detailsAvailable: !!(details || stack),
          visible: true
        });

        this.clearTimer();
        this.set("displayTimerId", setTimeout(this.close.bind(this), DISPLAY_TIME));
      } else {
        this.close();
      }
    }),

    clearTimer: function clearTimer() {
      clearTimeout(this.get("displayTimerId"));
    },
    close: function close() {
      this.set("visible", false);
      this.clearTimer();
    },

    actions: {
      toggleDetailsDisplay: function toggleDetailsDisplay() {
        this.toggleProperty("showDetails");
        this.clearTimer();
      },
      close: function close() {
        this.close();
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/jqui-accordion/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-accordion/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiAccordionComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiAccordionComponent['default'];
});
define('tez-ui/components/jqui-autocomplete/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-autocomplete/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiAutocompleteComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiAutocompleteComponent['default'];
});
define('tez-ui/components/jqui-button/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-button/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiButtonComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiButtonComponent['default'];
});
define('tez-ui/components/jqui-datepicker/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-datepicker/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiDatepickerComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiDatepickerComponent['default'];
});
define('tez-ui/components/jqui-menu/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-menu/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiMenuComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiMenuComponent['default'];
});
define('tez-ui/components/jqui-progress-bar/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-progress-bar/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiProgressBarComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiProgressBarComponent['default'];
});
define('tez-ui/components/jqui-slider/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-slider/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiSliderComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiSliderComponent['default'];
});
define('tez-ui/components/jqui-spinner/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-spinner/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiSpinnerComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiSpinnerComponent['default'];
});
define('tez-ui/components/jqui-tabs/component', ['exports', 'ember', 'ember-cli-jquery-ui/components/jqui-tabs/component'], function (exports, _ember, _emberCliJqueryUiComponentsJquiTabsComponent) {
  exports['default'] = _emberCliJqueryUiComponentsJquiTabsComponent['default'];
});
define("tez-ui/components/stats-link", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Component.extend({
    value: null,
    routeName: null,
    statsType: null,

    searchText: _ember["default"].computed.oneWay("statsType"),
    _statsType: _ember["default"].computed("statsType", function () {
      var type = this.get("statsType");
      if (type) {
        return _ember["default"].String.capitalize(type.toLowerCase());
      }
    })
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/tab-n-refresh', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    init: function init() {
      this._super();
      this.setApplication();
    },

    autoRefreshEnabled: false,
    autoRefreshVisible: true,

    setApplication: function setApplication() {
      var application = this.get("targetObject.container").lookup('controller:application');
      this.set("application", application);
    },

    autoRefreshObserver: _ember['default'].observer("autoRefreshEnabled", function () {
      this.get('targetObject').send('autoRefreshChanged', this.get("autoRefreshEnabled"));
    }),

    normalizedTabs: _ember['default'].computed("tabs", "application.currentPath", function () {
      var tabs = this.get("tabs") || [],
          activeRouteName = this.get("application.currentPath");

      return tabs.map(function (tab) {
        return {
          text: tab.text,
          routeName: tab.routeName,
          active: tab.routeName === activeRouteName
        };
      });
    }),

    actions: {
      refresh: function refresh() {
        this.get('targetObject').send('reload');
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/table-controls', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['table-controls'],

    actions: {
      cogClicked: function cogClicked() {
        this.get('targetObject.targetObject').send('openColumnSelector');
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/components/zip-download-modal', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    classNames: ['zip-download-modal'],
    content: null,

    _onSuccess: _ember['default'].observer("content.downloader.succeeded", function () {
      if (this.get("content.downloader.succeeded")) {
        _ember['default'].run.later(this, "close");
      }
    }),

    close: function close() {
      _ember['default'].$(".simple-modal").modal("hide");
    },

    actions: {
      cancel: function cancel() {
        var downloader = this.get("content.downloader");
        if (downloader) {
          downloader.cancel();
        }
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/abstract', ['exports', 'ember', 'tez-ui/mixins/name'], function (exports, _ember, _tezUiMixinsName) {
  exports['default'] = _ember['default'].Controller.extend(_tezUiMixinsName['default'], {
    // Must be set by inheriting classes
    breadcrumbs: null,

    // Must be set from abstract route
    loadTime: null,
    isLoading: false,

    init: function init() {
      this._super();
      _ember['default'].run.later(this, "setBreadcrumbs");
    },

    loaded: _ember['default'].computed("model", "isLoading", function () {
      return this.get("model") && !this.get("isLoading");
    }),

    crumbObserver: _ember['default'].observer("breadcrumbs", function () {
      _ember['default'].run.later(this, "setBreadcrumbs");
    }),

    setBreadcrumbs: function setBreadcrumbs() {
      var crumbs = {},
          name = this.get("name");
      crumbs[name] = this.get("breadcrumbs");
      this.send("setBreadcrumbs", crumbs);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/app', ['exports', 'ember', 'tez-ui/controllers/parent'], function (exports, _ember, _tezUiControllersParent) {
  exports['default'] = _tezUiControllersParent['default'].extend({
    breadcrumbs: _ember['default'].computed("model.appID", "model.app.name", function () {
      var name = this.get("model.app.name") || this.get("model.appID");

      return [{
        text: 'Application [ ' + name + ' ]',
        routeName: "app.index",
        model: this.get("model.entityID")
      }];
    }),

    tabs: [{
      text: "Application Details",
      routeName: "app.index"
    }, {
      text: "DAGs",
      routeName: "app.dags"
    }, {
      text: "Configurations",
      routeName: "app.configs"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/app/configs', ['exports', 'ember', 'tez-ui/controllers/table', 'em-table/utils/column-definition'], function (exports, _ember, _tezUiControllersTable, _emTableUtilsColumnDefinition) {

  var MoreObject = more.Object;

  exports['default'] = _tezUiControllersTable['default'].extend({
    searchText: "tez",

    breadcrumbs: [{
      text: "Configurations",
      routeName: "app.configs"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'configName',
      headerTitle: 'Configuration Name',
      contentPath: 'configName'
    }, {
      id: 'configValue',
      headerTitle: 'Configuration Value',
      contentPath: 'configValue'
    }]),

    configs: _ember['default'].computed("model.configs", function () {
      var configs = this.get("model.configs"),
          configRows = [];

      if (configs) {
        MoreObject.forEach(configs, function (key, value) {
          configRows.push(_ember['default'].Object.create({
            configName: key,
            configValue: value
          }));
        });
      }

      return _ember['default'].A(configRows);
    })
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/app/dags', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({
    breadcrumbs: [{
      text: "DAGs",
      routeName: "app.dags"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'name',
      headerTitle: 'Dag Name',
      contentPath: 'name',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "dag",
          model: row.get("entityID"),
          text: row.get("name")
        };
      }
    }, {
      id: 'entityID',
      headerTitle: 'Id',
      contentPath: 'entityID'
    }, {
      id: 'submitter',
      headerTitle: 'Submitter',
      contentPath: 'submitter'
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'queue',
      headerTitle: 'Queue',
      contentPath: 'queue'
    }, {
      id: 'callerID',
      headerTitle: 'Context ID',
      contentPath: 'callerID'
    }, {
      id: 'logs',
      headerTitle: 'Logs',
      contentPath: 'containerLogs',
      cellComponentName: "em-table-linked-cell",
      cellDefinition: {
        target: "_blank"
      }
    }]),

    getCounterColumns: function getCounterColumns() {
      return this._super().concat(this.get('env.app.tables.defaultColumns.dagCounters'));
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/app/index', ['exports', 'ember', 'tez-ui/controllers/page'], function (exports, _ember, _tezUiControllersPage) {
  exports['default'] = _tezUiControllersPage['default'].extend({

    trackingURL: _ember['default'].computed("model.appID", function () {
      return [this.get("hosts.rm"), this.get("env.app.namespaces.web.rm"), "app", this.get("model.appID")].join("/");
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/application', ['exports', 'ember'], function (exports, _ember) {

  var BREADCRUMB_PREFIX = [{
    text: "All DAGs",
    routeName: 'application'
  }];

  exports['default'] = _ember['default'].Controller.extend({
    breadcrumbs: null,
    appError: null,

    prefixedBreadcrumbs: _ember['default'].computed("breadcrumbs", function () {
      var prefix = BREADCRUMB_PREFIX,
          breadcrumbs = this.get('breadcrumbs');

      if (Array.isArray(breadcrumbs)) {
        prefix = prefix.concat(breadcrumbs);
      }

      return prefix;
    })
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('tez-ui/controllers/attempt', ['exports', 'ember', 'tez-ui/controllers/parent'], function (exports, _ember, _tezUiControllersParent) {
  exports['default'] = _tezUiControllersParent['default'].extend({
    breadcrumbs: _ember['default'].computed("model.dag", function () {
      var dagName = this.get("model.dag.name"),
          vertexName = this.get("model.vertexName"),
          taskIndex = this.get("model.taskIndex"),
          attemptNo = this.get("model.index");

      return [{
        text: 'DAG [ ' + dagName + ' ]',
        routeName: "dag.index",
        model: this.get("model.dagID")
      }, {
        text: 'Vertex [ ' + vertexName + ' ]',
        routeName: "vertex.index",
        model: this.get("model.vertexID")
      }, {
        text: 'Task [ ' + taskIndex + ' ]',
        routeName: "task.index",
        model: this.get("model.taskID")
      }, {
        text: 'Attempt [ ' + attemptNo + ' ]',
        routeName: "attempt.index",
        model: this.get("model.entityID")
      }];
    }),

    tabs: [{
      text: "Attempt Details",
      routeName: "attempt.index"
    }, {
      text: "Attempt Counters",
      routeName: "attempt.counters"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/controllers/attempt/counters", ["exports", "tez-ui/controllers/counters-table"], function (exports, _tezUiControllersCountersTable) {
  exports["default"] = _tezUiControllersCountersTable["default"].extend({
    breadcrumbs: [{
      text: "Attempt Counters",
      routeName: "attempt.counters"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/attempt/index', ['exports', 'tez-ui/controllers/page'], function (exports, _tezUiControllersPage) {
  exports['default'] = _tezUiControllersPage['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/counters-table', ['exports', 'ember', 'tez-ui/controllers/table', 'em-table/utils/column-definition'], function (exports, _ember, _tezUiControllersTable, _emTableUtilsColumnDefinition) {

  var MoreObject = more.Object;

  exports['default'] = _tezUiControllersTable['default'].extend({
    counters: _ember['default'].A(),
    countersCount: 0, // Because Ember.Array doesn't handle length well

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'groupName',
      headerTitle: 'Group Name',
      contentPath: 'groupName'
    }, {
      id: 'counterName',
      headerTitle: 'Counter Name',
      contentPath: 'counterName'
    }, {
      id: 'counterValue',
      headerTitle: 'Counter Value',
      contentPath: 'counterValue',
      observePath: true
    }]),

    _countersObserver: _ember['default'].observer("model.counterGroupsHash", function () {
      var counterGroupsHash = this.get("model.counterGroupsHash"),
          counters = this.get("counters"),
          counterIndex = 0;

      if (counterGroupsHash) {
        MoreObject.forEach(counterGroupsHash, function (groupName, countersHash) {
          if (countersHash) {
            MoreObject.forEach(countersHash, function (counterName, counterValue) {
              var counterRow = counters.get(counterIndex);
              if (!counterRow) {
                counterRow = _ember['default'].Object.create();
                counters.push(counterRow);
              }

              counterRow.setProperties({
                groupName: groupName,
                counterName: counterName,
                counterValue: counterValue
              });
              counterIndex++;
            });
          }
        });
      }

      this.set("countersCount", counterIndex);
    })
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag', ['exports', 'ember', 'tez-ui/controllers/parent'], function (exports, _ember, _tezUiControllersParent) {
  exports['default'] = _tezUiControllersParent['default'].extend({
    breadcrumbs: _ember['default'].computed("model", function () {
      var name = this.get("model.name");

      return [{
        text: 'DAG [ ' + name + ' ]',
        routeName: "dag.index.index",
        model: this.get("model.entityID")
      }];
    }),

    tabs: [{
      text: "DAG Details",
      routeName: "dag.index.index"
    }, {
      text: "DAG Counters",
      routeName: "dag.counters"
    }, {
      text: "Graphical View",
      routeName: "dag.graphical"
    }, {
      text: "All Vertices",
      routeName: "dag.vertices"
    }, {
      text: "All Tasks",
      routeName: "dag.tasks"
    }, {
      text: "All Task Attempts",
      routeName: "dag.attempts"
    }, {
      text: "Vertex Swimlane",
      routeName: "dag.swimlane"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/attempts', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({
    breadcrumbs: [{
      text: "All Task Attempts",
      routeName: "dag.attempts"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'index',
      headerTitle: 'Attempt No',
      contentPath: 'index',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "attempt",
          model: row.get("entityID"),
          text: row.get("index")
        };
      }
    }, {
      id: 'taskIndex',
      headerTitle: 'Task Index',
      contentPath: 'taskIndex',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "task",
          model: row.get("taskID"),
          text: row.get("taskIndex")
        };
      }
    }, {
      id: 'vertexName',
      headerTitle: 'Vertex Index',
      contentPath: 'vertexName',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "vertex",
          model: row.get("vertexID"),
          text: row.get("vertexName")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'containerID',
      headerTitle: 'Container',
      contentPath: 'containerID'
    }, {
      id: 'nodeID',
      headerTitle: 'Node',
      contentPath: 'nodeID'
    }, {
      id: 'log',
      headerTitle: 'Log',
      contentPath: 'logURL',
      cellComponentName: 'em-table-linked-cell',
      cellDefinition: {
        target: "_blank"
      },
      getCellContent: function getCellContent(row) {
        return [{
          href: row.get("logURL"),
          text: "View"
        }, {
          href: row.get("logURL"),
          text: "Download",
          download: true
        }];
      }
    }])
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/controllers/dag/counters", ["exports", "tez-ui/controllers/counters-table"], function (exports, _tezUiControllersCountersTable) {
  exports["default"] = _tezUiControllersCountersTable["default"].extend({
    breadcrumbs: [{
      text: "DAG Counters",
      routeName: "dag.counters"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/graphical', ['exports', 'ember', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _ember, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({

    columnSelectorTitle: 'Customize vertex tooltip',

    breadcrumbs: [{
      text: "Graphical View",
      routeName: "dag.graphical"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'name',
      headerTitle: 'Vertex Name',
      contentPath: 'name',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "vertex",
          model: row.get("entityID"),
          text: row.get("name")
        };
      }
    }, {
      id: 'entityID',
      headerTitle: 'Vertex Id',
      contentPath: 'entityID'
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'finalStatus',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'firstTaskStartTime',
      headerTitle: 'First Task Start Time',
      contentPath: 'firstTaskStartTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'totalTasks',
      headerTitle: 'Tasks',
      contentPath: 'totalTasks'
    }, {
      id: 'succeededTasks',
      headerTitle: 'Succeeded Tasks',
      contentPath: 'succeededTasks',
      observePath: true
    }, {
      id: 'runningTasks',
      headerTitle: 'Running Tasks',
      contentPath: 'runningTasks',
      observePath: true
    }, {
      id: 'pendingTasks',
      headerTitle: 'Pending Tasks',
      contentPath: 'pendingTasks',
      observePath: true
    }, {
      id: 'processorClassName',
      headerTitle: 'Processor Class',
      contentPath: 'processorClassName'
    }]),

    redirect: function redirect(details) {
      switch (details.type) {
        case 'vertex':
          this.transitionToRoute('vertex.index', details.d.get('data.entityID'));
          break;
        case 'task':
          this.transitionToRoute('vertex.tasks', details.d.get('data.entityID'));
          break;
        case 'io':
          break;
        case 'input':
          break;
        case 'output':
          break;
      }
    },

    actions: {
      entityClicked: function entityClicked(details) {

        /**
         * In IE 11 under Windows 7, mouse events are not delivered to the page
         * anymore at all after a SVG use element that was under the mouse is
         * removed from the DOM in the event listener in response to a mouse click.
         * See https://connect.microsoft.com/IE/feedback/details/796745
         *
         * This condition and related actions must be removed once the bug is fixed
         * in all supported IE versions
         */
        if (this.get("env.ENV.isIE")) {
          var pageType = details.type === "io" ? "additionals" : details.type,
              message = 'You will be redirected to ' + pageType + ' page';

          alert(message);
        }
        this.redirect(details);
      }
    },

    viewData: _ember['default'].computed("model", function () {
      var model = this.get("model"),
          dag,
          vertices,
          entities;

      if (!model) {
        return {};
      }

      dag = this.get('model.firstObject.dag');
      vertices = this.get('model.firstObject.dag.vertices') || [];
      entities = {};

      model.forEach(function (vertexData) {
        entities[vertexData.get('name')] = vertexData;
      });

      vertices.forEach(function (vertex) {
        vertex.data = entities[vertex.vertexName];
      });

      return {
        vertices: vertices,
        edges: dag.get('edges'),
        vertexGroups: dag.get('vertexGroups')
      };
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/index', ['exports', 'tez-ui/controllers/page'], function (exports, _tezUiControllersPage) {
  exports['default'] = _tezUiControllersPage['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/index/index', ['exports', 'ember', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _ember, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({
    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'name',
      headerTitle: 'Vertex Name',
      contentPath: 'name',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "vertex",
          model: row.get("entityID"),
          text: row.get("name")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'totalTasks',
      headerTitle: 'Total Tasks',
      contentPath: 'totalTasks',
      observePath: true
    }, {
      id: 'succeededTasks',
      headerTitle: 'Succeeded Tasks',
      contentPath: 'succeededTasks',
      observePath: true
    }, {
      id: 'runningTasks',
      headerTitle: 'Running Tasks',
      contentPath: 'runningTasks',
      observePath: true
    }, {
      id: 'pendingTasks',
      headerTitle: 'Pending Tasks',
      contentPath: 'pendingTasks',
      observePath: true
    }, {
      id: 'failedTaskAttempts',
      headerTitle: 'Failed Task Attempts',
      contentPath: 'failedTaskAttempts',
      observePath: true
    }, {
      id: 'killedTaskAttempts',
      headerTitle: 'Killed Task Attempts',
      contentPath: 'killedTaskAttempts',
      observePath: true
    }]),

    stats: _ember['default'].computed("model.@each.loadTime", function () {
      var vertices = this.get("model");

      if (vertices) {
        var _ret = (function () {
          var succeededVertices = 0,
              succeededTasks = 0,
              totalTasks = 0,
              failedTasks = 0,
              killedTasks = 0,
              failedTaskAttempts = 0,
              killedTaskAttempts = 0;

          vertices.forEach(function (vertex) {
            if (vertex.get("status") === "SUCCEEDED") {
              succeededVertices++;
            }

            succeededTasks += vertex.get("succeededTasks");
            totalTasks += vertex.get("totalTasks");

            failedTasks += vertex.get("failedTasks");
            killedTasks += vertex.get("killedTasks");

            failedTaskAttempts += vertex.get("failedTaskAttempts");
            killedTaskAttempts += vertex.get("killedTaskAttempts");
          });

          return {
            v: {
              succeededVertices: succeededVertices,
              totalVertices: vertices.get("length"),

              succeededTasks: succeededTasks,
              totalTasks: totalTasks,

              failedTasks: failedTasks,
              killedTasks: killedTasks,

              failedTaskAttempts: failedTaskAttempts,
              killedTaskAttempts: killedTaskAttempts
            }
          };
        })();

        if (typeof _ret === 'object') return _ret.v;
      }
    }),

    beforeSort: function beforeSort() {
      return true;
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/swimlane', ['exports', 'ember', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition', 'tez-ui/utils/vertex-process', 'em-tgraph/utils/fullscreen'], function (exports, _ember, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition, _tezUiUtilsVertexProcess, _emTgraphUtilsFullscreen) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({

    zoom: 100,

    columnSelectorTitle: 'Customize vertex tooltip',

    breadcrumbs: [{
      text: "Vertex Swimlane",
      routeName: "dag.swimlane"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'entityID',
      headerTitle: 'Vertex Id',
      contentPath: 'entityID'
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'finalStatus'
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellDefinition: {
        type: 'number',
        format: '0%'
      }
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellDefinition: {
        type: 'date'
      }
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellDefinition: {
        type: 'date'
      }
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'firstTaskStartTime',
      headerTitle: 'First Task Start Time',
      contentPath: 'firstTaskStartTime',
      cellDefinition: {
        type: 'date'
      }
    }, {
      id: 'totalTasks',
      headerTitle: 'Tasks',
      contentPath: 'totalTasks'
    }, {
      id: 'succeededTasks',
      headerTitle: 'Succeeded Tasks',
      contentPath: 'succeededTasks'
    }, {
      id: 'runningTasks',
      headerTitle: 'Running Tasks',
      contentPath: 'runningTasks'
    }, {
      id: 'pendingTasks',
      headerTitle: 'Pending Tasks',
      contentPath: 'pendingTasks'
    }, {
      id: 'processorClassName',
      headerTitle: 'Processor Class',
      contentPath: 'processorClassName'
    }]),

    processes: _ember['default'].computed("model", function () {
      var processes = [],
          processHash = {},
          dagPlanEdges = this.get("model.firstObject.dag.edges"),
          that = this,
          getVisibleProps = function getVisibleProps() {
        return that.get("visibleColumns");
      };

      // Create process instances for each vertices
      this.get("model").forEach(function (vertex) {
        var process = _tezUiUtilsVertexProcess['default'].create({
          vertex: vertex,
          getVisibleProps: getVisibleProps,
          blockers: _ember['default'].A()
        });
        processHash[vertex.get("name")] = process;
        processes.push(process);
      });

      // Add process(vertex) dependencies based on dagPlan
      if (dagPlanEdges) {
        dagPlanEdges.forEach(function (edge) {
          var process = processHash[edge.outputVertexName];
          if (process && processHash[edge.inputVertexName]) {
            process.blockers.push(processHash[edge.inputVertexName]);
            process.edgeHash.set(edge.inputVertexName, edge);
          }
        });
      }

      return _ember['default'].A(processes);
    }),

    actions: {
      toggleFullscreen: function toggleFullscreen() {
        var swimlaneElement = _ember['default'].$(".swimlane-page").get(0);
        if (swimlaneElement) {
          _emTgraphUtilsFullscreen['default'].toggle(swimlaneElement);
        }
      },
      click: function click(type, process) {
        this.transitionToRoute('vertex.index', process.get('vertex.entityID'));
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/tasks', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({
    breadcrumbs: [{
      text: "All Tasks",
      routeName: "dag.tasks"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'index',
      headerTitle: 'Task Index',
      contentPath: 'index',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "task",
          model: row.get("entityID"),
          text: row.get("index")
        };
      }
    }, {
      id: 'vertexName',
      headerTitle: 'Vertex Name',
      contentPath: 'vertexName',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "vertex",
          model: row.get("vertexID"),
          text: row.get("vertexName")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }])
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dag/vertices', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend({
    breadcrumbs: [{
      text: "All Vertices",
      routeName: "dag.vertices"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'name',
      headerTitle: 'Vertex Name',
      contentPath: 'name',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "vertex",
          model: row.get("entityID"),
          text: row.get("name")
        };
      }
    }, {
      id: 'entityID',
      headerTitle: 'Vertex Id',
      contentPath: 'entityID'
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'finalStatus',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'firstTaskStartTime',
      headerTitle: 'First Task Start Time',
      contentPath: 'firstTaskStartTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'totalTasks',
      headerTitle: 'Tasks',
      contentPath: 'totalTasks'
    }, {
      id: 'succeededTasks',
      headerTitle: 'Succeeded Tasks',
      contentPath: 'succeededTasks',
      observePath: true
    }, {
      id: 'runningTasks',
      headerTitle: 'Running Tasks',
      contentPath: 'runningTasks',
      observePath: true
    }, {
      id: 'pendingTasks',
      headerTitle: 'Pending Tasks',
      contentPath: 'pendingTasks',
      observePath: true
    }, {
      id: 'processorClassName',
      headerTitle: 'Processor Class',
      contentPath: 'processorClassName'
    }]),

    beforeSort: function beforeSort(columnDefinition) {
      if (this._super(columnDefinition)) {
        if (this.get("polling.isReady")) {
          var columnName = columnDefinition.get("headerTitle");
          switch (columnDefinition.get("contentPath")) {
            case "succeededTasks":
            case "runningTasks":
            case "pendingTasks":
              this.send("openModal", {
                title: "Cannot sort!",
                content: 'Sorting on ' + columnName + ' is disabled for running DAGs!'
              });
              return false;
          }
        }
      }
      return true;
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/dags', ['exports', 'ember', 'tez-ui/controllers/table', 'em-table/utils/column-definition', 'em-table/utils/table-definition'], function (exports, _ember, _tezUiControllersTable, _emTableUtilsColumnDefinition, _emTableUtilsTableDefinition) {
  exports['default'] = _tezUiControllersTable['default'].extend({

    queryParams: ["dagName", "dagID", "submitter", "status", "appID", "callerID"],
    dagName: "",
    dagID: "",
    submitter: "",
    status: "",
    appID: "",
    callerID: "",

    // Because pageNo is a query param added by table controller, and in the current design
    // we don't want page to be a query param as only the first page will be loaded first.
    pageNum: 1,

    breadcrumbs: [],

    moreAvailable: false,
    loadingMore: false,

    headerComponentNames: ['dags-page-search', 'table-controls', 'dags-pagination-ui'],

    _definition: _emTableUtilsTableDefinition['default'].create(),
    // Using computed, as observer won't fire if the property is not used
    definition: _ember['default'].computed("dagName", "dagID", "submitter", "status", "appID", "callerID", "pageNum", "moreAvailable", "loadingMore", function () {

      var definition = this.get("_definition");

      definition.setProperties({
        dagName: this.get("dagName"),
        dagID: this.get("dagID"),
        submitter: this.get("submitter"),
        status: this.get("status"),
        appID: this.get("appID"),
        callerID: this.get("callerID"),

        pageNum: this.get("pageNum"),

        moreAvailable: this.get("moreAvailable"),
        loadingMore: this.get("loadingMore")
      });

      return definition;
    }),

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'name',
      headerTitle: 'Dag Name',
      contentPath: 'name',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "dag",
          model: row.get("entityID"),
          text: row.get("name")
        };
      }
    }, {
      id: 'entityID',
      headerTitle: 'Id',
      contentPath: 'entityID'
    }, {
      id: 'submitter',
      headerTitle: 'Submitter',
      contentPath: 'submitter'
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'appID',
      headerTitle: 'Application Id',
      contentPath: 'appID',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "app",
          model: row.get("appID"),
          text: row.get("appID")
        };
      }
    }, {
      id: 'queue',
      headerTitle: 'Queue',
      contentPath: 'queue'
    }, {
      id: 'callerID',
      headerTitle: 'Caller ID',
      contentPath: 'callerID'
    }, {
      id: 'callerType',
      headerTitle: 'Caller Type',
      contentPath: 'callerType'
    }, {
      id: 'logs',
      headerTitle: 'Logs',
      contentPath: 'containerLogs',
      cellComponentName: "em-table-linked-cell",
      cellDefinition: {
        target: "_blank"
      }
    }]),

    getCounterColumns: function getCounterColumns() {
      return this._super().concat(this.get('env.app.tables.defaultColumns.dagCounters'));
    },

    actions: {
      search: function search(properties) {
        this.setProperties(properties);
      },
      pageChanged: function pageChanged(pageNum) {
        this.set("pageNum", pageNum);
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/multi-table', ['exports', 'ember', 'tez-ui/controllers/table', 'tez-ui/utils/counter-column-definition'], function (exports, _ember, _tezUiControllersTable, _tezUiUtilsCounterColumnDefinition) {
  exports['default'] = _tezUiControllersTable['default'].extend({

    _visibleColumnsObserver: _ember['default'].on("init", _ember['default'].observer("visibleColumns", function () {
      _ember['default'].run.later(this, "sendCountersChanged");
    })),

    sendCountersChanged: function sendCountersChanged() {
      var visibleCounters = this.get("visibleColumns").filter(function (definition) {
        return definition instanceof _tezUiUtilsCounterColumnDefinition['default'];
      });
      this.send("countersToPollChanged", visibleCounters);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('tez-ui/controllers/page', ['exports', 'tez-ui/controllers/abstract'], function (exports, _tezUiControllersAbstract) {
  exports['default'] = _tezUiControllersAbstract['default'].extend({
    // Any page specific
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/parent', ['exports', 'ember', 'tez-ui/controllers/abstract'], function (exports, _ember, _tezUiControllersAbstract) {
  exports['default'] = _tezUiControllersAbstract['default'].extend({
    polling: _ember['default'].inject.service("pollster"),
    actions: {
      autoRefreshChanged: function autoRefreshChanged(state) {
        this.get("polling").set("active", state);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/table', ['exports', 'ember', 'tez-ui/controllers/abstract', 'em-table/utils/table-definition', 'tez-ui/utils/misc', 'tez-ui/utils/counter-column-definition'], function (exports, _ember, _tezUiControllersAbstract, _emTableUtilsTableDefinition, _tezUiUtilsMisc, _tezUiUtilsCounterColumnDefinition) {

  var MoreObject = more.Object;

  exports['default'] = _tezUiControllersAbstract['default'].extend({
    queryParams: ["rowCount", "searchText", "sortColumnId", "sortOrder", "pageNo"],
    rowCount: 10,
    searchText: "",
    sortColumnId: "",
    sortOrder: "",
    pageNo: 1,

    columns: [],

    headerComponentNames: ['em-table-search-ui', 'table-controls', 'em-table-pagination-ui'],

    visibleColumnIDs: {},
    columnSelectorTitle: 'Column Selector',
    columnSelectorMessage: "",

    polling: _ember['default'].inject.service("pollster"),

    definition: _ember['default'].computed("model", function () {
      return _emTableUtilsTableDefinition['default'].create({
        rowCount: this.get("rowCount"),
        searchText: this.get("searchText"),
        sortColumnId: this.get("sortColumnId"),
        sortOrder: this.get("sortOrder"),
        pageNo: this.get("pageNo")
      });
    }),

    storageID: _ember['default'].computed("name", function () {
      return this.get("name") + ":visibleColumnIDs";
    }),

    initVisibleColumns: _ember['default'].on("init", _ember['default'].observer("columns", function () {
      //To reset on entity change
      var visibleColumnIDs = this.get("localStorage").get(this.get("storageID")) || {};

      this.get('columns').forEach(function (config) {
        if (visibleColumnIDs[config.id] !== false) {
          visibleColumnIDs[config.id] = true;
        }
      });

      this.set('visibleColumnIDs', visibleColumnIDs);
    })),

    beforeSort: function beforeSort(columnDefinition) {
      if (this.get("polling.isReady")) {
        var columnName = columnDefinition.get("headerTitle");
        switch (columnDefinition.get("contentPath")) {
          case "counterGroupsHash":
            columnName = "Counters";
          /* falls through */
          case "status":
          case "progress":
            this.send("openModal", {
              title: "Cannot sort!",
              content: 'Sorting on ' + columnName + ' is disabled for running DAGs!'
            });
            return false;
        }
      }
      return true;
    },

    allColumns: _ember['default'].computed("columns", function () {
      var columns = this.get("columns"),
          counters = this.getCounterColumns(),
          beforeSort = this.get("beforeSort").bind(this);

      columns = columns.concat(_tezUiUtilsCounterColumnDefinition['default'].make(counters));

      columns.forEach(function (column) {
        column.set("beforeSort", beforeSort);
      });

      return columns;
    }),

    visibleColumns: _ember['default'].computed('visibleColumnIDs', 'allColumns', function () {
      var visibleColumnIDs = this.visibleColumnIDs;
      return this.get('allColumns').filter(function (column) {
        return visibleColumnIDs[column.get("id")];
      });
    }),

    getCounterColumns: function getCounterColumns() {
      return this.get('env.app.tables.defaultColumns.counters');
    },

    actions: {
      searchChanged: function searchChanged(searchText) {
        this.set("searchText", searchText);
      },
      sortChanged: function sortChanged(sortColumnId, sortOrder) {
        this.setProperties({
          sortColumnId: sortColumnId,
          sortOrder: sortOrder
        });
      },
      rowCountChanged: function rowCountChanged(rowCount) {
        this.set("rowCount", rowCount);
      },
      pageChanged: function pageChanged(pageNum) {
        this.set("pageNo", pageNum);
      },

      rowsChanged: function rowsChanged(rows) {
        this.send("setPollingRecords", rows);
      },

      // Column selection actions
      openColumnSelector: function openColumnSelector() {
        this.send("openModal", "column-selector", {
          title: this.get('columnSelectorTitle'),
          targetObject: this,
          content: {
            message: this.get('columnSelectorMessage'),
            columns: this.get('allColumns'),
            visibleColumnIDs: this.get('visibleColumnIDs')
          }
        });
      },
      columnsSelected: function columnsSelected(visibleColumnIDs) {
        var columnIDs = {};

        MoreObject.forEach(visibleColumnIDs, function (key, value) {
          if (!(0, _tezUiUtilsMisc['default'])(key)) {
            columnIDs[key] = value;
          }
        });

        if (!MoreObject.equals(columnIDs, this.get("visibleColumnIDs"))) {
          this.get("localStorage").set(this.get("storageID"), columnIDs);
          this.set('visibleColumnIDs', columnIDs);
        }
      }
    }
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/task', ['exports', 'ember', 'tez-ui/controllers/parent'], function (exports, _ember, _tezUiControllersParent) {
  exports['default'] = _tezUiControllersParent['default'].extend({
    breadcrumbs: _ember['default'].computed("model.dag", function () {
      var dagName = this.get("model.dag.name"),
          vertexName = this.get("model.vertexName") || this.get("model.vertexIndex"),
          taskIndex = this.get("model.index");

      return [{
        text: 'DAG [ ' + dagName + ' ]',
        routeName: "dag.index",
        model: this.get("model.dagID")
      }, {
        text: 'Vertex [ ' + vertexName + ' ]',
        routeName: "vertex.index",
        model: this.get("model.vertexID")
      }, {
        text: 'Task [ ' + taskIndex + ' ]',
        routeName: "task.index",
        model: this.get("model.entityID")
      }];
    }),

    tabs: [{
      text: "Task Details",
      routeName: "task.index"
    }, {
      text: "Task Counters",
      routeName: "task.counters"
    }, {
      text: "Task Attempts",
      routeName: "task.attempts"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/task/attempts', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition', 'tez-ui/mixins/auto-counter-column'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition, _tezUiMixinsAutoCounterColumn) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend(_tezUiMixinsAutoCounterColumn['default'], {
    breadcrumbs: [{
      text: "Task Attempts",
      routeName: "task.attempts"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'index',
      headerTitle: 'Attempt No',
      contentPath: 'index',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "attempt",
          model: row.get("entityID"),
          text: row.get("index")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'containerID',
      headerTitle: 'Container',
      contentPath: 'containerID'
    }, {
      id: 'nodeID',
      headerTitle: 'Node',
      contentPath: 'nodeID'
    }, {
      id: 'log',
      headerTitle: 'Log',
      contentPath: 'logURL',
      cellComponentName: 'em-table-linked-cell',
      cellDefinition: {
        target: "_blank"
      },
      getCellContent: function getCellContent(row) {
        return [{
          href: row.get("logURL"),
          text: "View"
        }, {
          href: row.get("logURL"),
          text: "Download",
          download: true
        }];
      }
    }])
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/controllers/task/counters", ["exports", "tez-ui/controllers/counters-table"], function (exports, _tezUiControllersCountersTable) {
  exports["default"] = _tezUiControllersCountersTable["default"].extend({
    breadcrumbs: [{
      text: "Task Counters",
      routeName: "task.counters"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/task/index', ['exports', 'tez-ui/controllers/page'], function (exports, _tezUiControllersPage) {
  exports['default'] = _tezUiControllersPage['default'].extend({
    attempts: null
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/vertex', ['exports', 'ember', 'tez-ui/controllers/parent'], function (exports, _ember, _tezUiControllersParent) {
  exports['default'] = _tezUiControllersParent['default'].extend({
    breadcrumbs: _ember['default'].computed("model.dag", function () {
      var dagName = this.get("model.dag.name"),
          vertexName = this.get("model.name") || this.get("model.index");

      return [{
        text: 'DAG [ ' + dagName + ' ]',
        routeName: "dag.index",
        model: this.get("model.dagID")
      }, {
        text: 'Vertex [ ' + vertexName + ' ]',
        routeName: "vertex.index",
        model: this.get("model.vertexID")
      }];
    }),

    tabs: [{
      text: "Vertex Details",
      routeName: "vertex.index"
    }, {
      text: "Vertex Counters",
      routeName: "vertex.counters"
    }, {
      text: "Tasks",
      routeName: "vertex.tasks"
    }, {
      text: "Task Attempts",
      routeName: "vertex.attempts"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/vertex/attempts', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition', 'tez-ui/mixins/auto-counter-column'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition, _tezUiMixinsAutoCounterColumn) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend(_tezUiMixinsAutoCounterColumn['default'], {
    breadcrumbs: [{
      text: "Task Attempts",
      routeName: "vertex.attempts"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'index',
      headerTitle: 'Attempt No',
      contentPath: 'index',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "attempt",
          model: row.get("entityID"),
          text: row.get("index")
        };
      }
    }, {
      id: 'taskIndex',
      headerTitle: 'Task Index',
      contentPath: 'taskIndex',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "task",
          model: row.get("taskID"),
          text: row.get("taskIndex")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }, {
      id: 'containerID',
      headerTitle: 'Container',
      contentPath: 'containerID'
    }, {
      id: 'nodeID',
      headerTitle: 'Node',
      contentPath: 'nodeID'
    }, {
      id: 'log',
      headerTitle: 'Log',
      contentPath: 'logURL',
      cellComponentName: 'em-table-linked-cell',
      cellDefinition: {
        target: "_blank"
      },
      getCellContent: function getCellContent(row) {
        return [{
          href: row.get("logURL"),
          text: "View"
        }, {
          href: row.get("logURL"),
          text: "Download",
          download: true
        }];
      }
    }])
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/controllers/vertex/counters", ["exports", "tez-ui/controllers/counters-table"], function (exports, _tezUiControllersCountersTable) {
  exports["default"] = _tezUiControllersCountersTable["default"].extend({
    breadcrumbs: [{
      text: "Vertex Counters",
      routeName: "vertex.counters"
    }]
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/vertex/index', ['exports', 'ember', 'tez-ui/controllers/page'], function (exports, _ember, _tezUiControllersPage) {

  function taskLinkComputerFactory(name) {
    return _ember['default'].computed(name, function () {
      var tasks = this.get(name);

      if (tasks) {
        return tasks.map(function (task) {
          return {
            routeName: 'task',
            model: task,
            text: task
          };
        });
      }
    });
  }

  exports['default'] = _tezUiControllersPage['default'].extend({

    pathname: _ember['default'].computed(function () {
      return window.location.pathname;
    }).volatile(),

    firstTasksToStart: taskLinkComputerFactory("model.firstTasksToStart"),
    lastTasksToFinish: taskLinkComputerFactory("model.lastTasksToFinish"),
    shortestDurationTasks: taskLinkComputerFactory("model.shortestDurationTasks"),
    longestDurationTasks: taskLinkComputerFactory("model.longestDurationTasks")

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/controllers/vertex/tasks', ['exports', 'tez-ui/controllers/multi-table', 'em-table/utils/column-definition', 'tez-ui/mixins/auto-counter-column'], function (exports, _tezUiControllersMultiTable, _emTableUtilsColumnDefinition, _tezUiMixinsAutoCounterColumn) {
  exports['default'] = _tezUiControllersMultiTable['default'].extend(_tezUiMixinsAutoCounterColumn['default'], {
    breadcrumbs: [{
      text: "Tasks",
      routeName: "vertex.tasks"
    }],

    columns: _emTableUtilsColumnDefinition['default'].make([{
      id: 'index',
      headerTitle: 'Task Index',
      contentPath: 'index',
      cellComponentName: 'em-table-linked-cell',
      getCellContent: function getCellContent(row) {
        return {
          routeName: "task",
          model: row.get("entityID"),
          text: row.get("index")
        };
      }
    }, {
      id: 'status',
      headerTitle: 'Status',
      contentPath: 'status',
      cellComponentName: 'em-table-status-cell',
      observePath: true
    }, {
      id: 'progress',
      headerTitle: 'Progress',
      contentPath: 'progress',
      cellComponentName: 'em-table-progress-cell',
      observePath: true
    }, {
      id: 'startTime',
      headerTitle: 'Start Time',
      contentPath: 'startTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'endTime',
      headerTitle: 'End Time',
      contentPath: 'endTime',
      cellComponentName: 'date-formatter'
    }, {
      id: 'duration',
      headerTitle: 'Duration',
      contentPath: 'duration',
      cellDefinition: {
        type: 'duration'
      }
    }])
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/entities/am', ['exports', 'ember', 'tez-ui/entities/entity'], function (exports, _ember, _tezUiEntitiesEntity) {
  exports['default'] = _tezUiEntitiesEntity['default'].extend({

    idsToJoin: null,
    deferred: null,

    resetJoiner: _ember['default'].on("init", function () {
      this.set("idsToJoin", []);
      this.set("deferred", _ember['default'].RSVP.defer());
    }),

    queryRecord: function queryRecord(loader, id, options, query, urlParams) {
      this.get("idsToJoin").push(query[this.get("queryPropertyToJoin")]);

      // Yup, only the last query would be taken by design
      _ember['default'].run.once(this, "queryJoinedRecords", loader, options, query, urlParams);

      return this.get("deferred.promise").then(function (recordHash) {
        return recordHash[id];
      });
    },

    queryJoinedRecords: function queryJoinedRecords(loader, options, query, urlParams) {
      var deferred = this.get("deferred");

      query[this.get("queryPropertyToJoin")] = this.get("idsToJoin").join(",");
      this.query(loader, query, options, urlParams).then(function (records) {
        deferred.resolve(records.reduce(function (recordHash, record) {
          recordHash[record.get("entityID")] = record;
          return recordHash;
        }, {}));
      }, function (error) {
        deferred.reject(error);
      })['finally'](this.resetJoiner.bind(this));
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/entities/attempt-am", ["exports", "tez-ui/entities/am"], function (exports, _tezUiEntitiesAm) {
  exports["default"] = _tezUiEntitiesAm["default"].extend({
    queryPropertyToJoin: "attemptID"
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/entities/entity', ['exports', 'ember', 'tez-ui/mixins/name'], function (exports, _ember, _tezUiMixinsName) {

  var MoreObject = more.Object;

  var Entity = _ember['default'].Object.extend(_tezUiMixinsName['default'], {

    queryRecord: function queryRecord(loader, id, options, query, urlParams) {
      var that = this;
      return this.get('store').queryRecord(this.get("name"), {
        id: id,
        nameSpace: loader.get('nameSpace'),
        params: query,
        urlParams: urlParams
      }).then(function (record) {
        return that._loadAllNeeds(loader, record, options, urlParams);
      });
    },

    query: function query(loader, _query, options, urlParams) {
      var that = this;
      return this.get('store').query(this.get("name"), {
        nameSpace: loader.get('nameSpace'),
        params: _query,
        urlParams: urlParams
      }).then(function (records) {
        return _ember['default'].RSVP.all(records.map(function (record) {
          return that._loadAllNeeds(loader, record, options, urlParams);
        })).then(function () {
          return records;
        });
      });
    },

    normalizeNeed: function normalizeNeed(name, needOptions, parentModel, queryParams, urlParams) {
      var need = {
        name: name,
        type: name,
        idKey: needOptions,

        loadType: "", // Possible values lazy, demand
        silent: false

      },
          //urlParams
      //queryParams
      overrides = {};

      if (typeof needOptions === 'object') {
        _ember['default'].assert('idKey not defined for need \'' + name + '\'!', needOptions.idKey);

        if (MoreObject.isFunction(needOptions.urlParams)) {
          overrides.urlParams = needOptions.urlParams.call(needOptions, parentModel);
        }
        if (MoreObject.isFunction(needOptions.queryParams)) {
          overrides.queryParams = needOptions.queryParams.call(needOptions, parentModel);
        }

        overrides = _ember['default'].Object.create({}, needOptions, overrides);
      }

      if (queryParams) {
        overrides.queryParams = _ember['default'].$.extend({}, overrides.queryParams, queryParams);
      }
      if (urlParams) {
        overrides.urlParams = _ember['default'].$.extend({}, overrides.urlParams, urlParams);
      }

      return _ember['default'].Object.create(need, overrides);
    },

    _loadNeed: function _loadNeed(loader, parentModel, needOptions, options, index) {
      var needLoader,
          that = this,
          types = needOptions.type,
          type;

      if (!Array.isArray(types)) {
        types = [types];
      }

      index = index || 0;
      type = types[index];

      needLoader = loader.queryRecord(type, parentModel.get(needOptions.idKey), options, needOptions.queryParams, needOptions.urlParams);

      needLoader = needLoader.then(function (model) {
        parentModel.set(needOptions.name, model);
        parentModel.refreshLoadTime();
        return model;
      });

      needLoader = needLoader['catch'](function (err) {
        if (++index < types.length) {
          return that._loadNeed(loader, parentModel, needOptions, options, index);
        }

        if (needOptions.silent) {
          parentModel.set(needOptions.name, null);
          parentModel.refreshLoadTime();
        } else {
          throw err;
        }
      });

      return needLoader;
    },

    loadNeed: function loadNeed(loader, parentModel, needName, options, queryParams, urlParams) {
      var needOptions = parentModel.get('needs.' + needName);
      _ember['default'].assert('Need \'' + needName + '\' not defined in model!', needOptions);

      needOptions = this.normalizeNeed(needName, needOptions, parentModel, queryParams, urlParams);
      return this._loadNeed(loader, parentModel, needOptions, options);
    },

    _loadAllNeeds: function _loadAllNeeds(loader, model, options /*, urlParams*/) {
      var needsPromise = this.loadAllNeeds(loader, model, options);

      if (needsPromise) {
        return needsPromise.then(function () {
          return model;
        });
      }

      return model;
    },

    loadAllNeeds: function loadAllNeeds(loader, parentModel, options, queryParams, urlParams) {
      var needLoaders = [],
          that = this,
          needs = parentModel.get("needs");

      if (needs) {
        MoreObject.forEach(needs, function (name, needOptions) {
          needOptions = that.normalizeNeed(name, needOptions, parentModel, queryParams, urlParams);

          if (needOptions.loadType !== "demand") {
            var needLoader = that._loadNeed(loader, parentModel, needOptions, options);

            if (needOptions.loadType !== "lazy") {
              needLoaders.push(needLoader);
            }
          }
        });
      }

      if (needLoaders.length) {
        return _ember['default'].RSVP.all(needLoaders);
      }
    }

  });

  exports['default'] = Entity;
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/entities/task-am", ["exports", "tez-ui/entities/am"], function (exports, _tezUiEntitiesAm) {
  exports["default"] = _tezUiEntitiesAm["default"].extend({
    queryPropertyToJoin: "taskID"
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/entities/vertex-am", ["exports", "tez-ui/entities/am"], function (exports, _tezUiEntitiesAm) {
  exports["default"] = _tezUiEntitiesAm["default"].extend({
    queryPropertyToJoin: "vertexID"
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/errors/unlinked-promise', ['exports', 'ember'], function (exports, _ember) {

  var UnlinkedPromise = function UnlinkedPromise(errors) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Promise chain was unlinked.' : arguments[1];

    _ember['default'].Error.call(this, message);

    this.errors = errors || [{
      title: 'Unlinked promise chain.',
      detail: message
    }];
  };

  UnlinkedPromise.prototype = Object.create(_ember['default'].Error.prototype);

  exports['default'] = UnlinkedPromise;
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/helpers/color-scale', ['exports', 'ember-cli-d3/helpers/color-scale'], function (exports, _emberCliD3HelpersColorScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersColorScale['default'];
    }
  });
  Object.defineProperty(exports, 'colorScale', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersColorScale.colorScale;
    }
  });
});
define('tez-ui/helpers/em-status', ['exports', 'em-helpers/helpers/em-status'], function (exports, _emHelpersHelpersEmStatus) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emHelpersHelpersEmStatus['default'];
    }
  });
  Object.defineProperty(exports, 'emStatus', {
    enumerable: true,
    get: function get() {
      return _emHelpersHelpersEmStatus.emStatus;
    }
  });
});
define('tez-ui/helpers/is-equal', ['exports', 'ember-bootstrap/helpers/is-equal'], function (exports, _emberBootstrapHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersIsEqual.isEqual;
    }
  });
});
define('tez-ui/helpers/is-not', ['exports', 'ember-bootstrap/helpers/is-not'], function (exports, _emberBootstrapHelpersIsNot) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersIsNot['default'];
    }
  });
  Object.defineProperty(exports, 'isNot', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersIsNot.isNot;
    }
  });
});
define('tez-ui/helpers/negative', ['exports', 'ember-cli-d3/helpers/negative'], function (exports, _emberCliD3HelpersNegative) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersNegative['default'];
    }
  });
  Object.defineProperty(exports, 'negative', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersNegative.negative;
    }
  });
});
define('tez-ui/helpers/read-path', ['exports', 'ember-bootstrap/helpers/read-path'], function (exports, _emberBootstrapHelpersReadPath) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersReadPath['default'];
    }
  });
  Object.defineProperty(exports, 'readPath', {
    enumerable: true,
    get: function get() {
      return _emberBootstrapHelpersReadPath.readPath;
    }
  });
});
define('tez-ui/helpers/transition', ['exports', 'ember-cli-d3/helpers/transition'], function (exports, _emberCliD3HelpersTransition) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersTransition['default'];
    }
  });
  Object.defineProperty(exports, 'transition', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersTransition.transition;
    }
  });
});
define('tez-ui/helpers/translate', ['exports', 'ember-cli-d3/helpers/translate'], function (exports, _emberCliD3HelpersTranslate) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersTranslate['default'];
    }
  });
  Object.defineProperty(exports, 'translate', {
    enumerable: true,
    get: function get() {
      return _emberCliD3HelpersTranslate.translate;
    }
  });
});
define('tez-ui/helpers/txt', ['exports', 'em-helpers/helpers/txt'], function (exports, _emHelpersHelpersTxt) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emHelpersHelpersTxt['default'];
    }
  });
  Object.defineProperty(exports, 'txt', {
    enumerable: true,
    get: function get() {
      return _emHelpersHelpersTxt.txt;
    }
  });
});
define('tez-ui/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'tez-ui/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _tezUiConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_tezUiConfigEnvironment['default'].APP.name, _tezUiConfigEnvironment['default'].APP.version)
  };
});
define('tez-ui/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define("tez-ui/initializers/entities", ["exports", "ember-cli-auto-register/register"], function (exports, _emberCliAutoRegisterRegister) {
  exports.initialize = initialize;

  function initialize(application) {
    (0, _emberCliAutoRegisterRegister["default"])("entity", application);
    application.inject('entitie', 'store', 'service:store');
  }

  exports["default"] = {
    name: 'entities',
    initialize: initialize
  };
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/initializers/env', ['exports'], function (exports) {
  exports.initialize = initialize;
  /**
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function initialize(application) {
    application.inject('controller', 'env', 'service:env');
    application.inject('route', 'env', 'service:env');
    application.inject('adapter', 'env', 'service:env');
    application.inject('serializer', 'env', 'service:env');
  }

  exports['default'] = {
    name: 'env',
    initialize: initialize
  };
});
define('tez-ui/initializers/export-application-global', ['exports', 'ember', 'tez-ui/config/environment'], function (exports, _ember, _tezUiConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_tezUiConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _tezUiConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_tezUiConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('tez-ui/initializers/hosts', ['exports'], function (exports) {
  exports.initialize = initialize;
  /**
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function initialize(application) {
    application.inject('controller', 'hosts', 'service:hosts');
    application.inject('adapter', 'hosts', 'service:hosts');
    application.inject('route', 'hosts', 'service:hosts');
  }

  exports['default'] = {
    name: 'hosts',
    initialize: initialize
  };
});
define('tez-ui/initializers/jquery', ['exports', 'ember'], function (exports, _ember) {
  exports.initialize = initialize;

  function initialize() /* application */{
    _ember['default'].$(document).tooltip({
      delay: 20,
      tooltipClass: 'generic-tooltip'
    });

    _ember['default'].$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      jqXHR.requestOptions = originalOptions;
    });

    _ember['default'].$.ajaxSetup({
      cache: false
    });
  }

  exports['default'] = {
    name: 'jquery',
    initialize: initialize
  };
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/initializers/load-bootstrap-config', ['exports', 'tez-ui/config/environment', 'ember-bootstrap/config'], function (exports, _tezUiConfigEnvironment, _emberBootstrapConfig) {
  exports.initialize = initialize;

  function initialize() /* container, application */{
    _emberBootstrapConfig['default'].load(_tezUiConfigEnvironment['default']['ember-bootstrap'] || {});
  }

  exports['default'] = {
    name: 'load-bootstrap-config',
    initialize: initialize
  };
});
define('tez-ui/initializers/loader', ['exports'], function (exports) {
  exports.initialize = initialize;
  /**
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function initialize(application) {
    application.inject('route', 'loader', 'service:loader');
    application.inject('entity', 'loader', 'service:loader');
  }

  exports['default'] = {
    name: 'loader',
    initialize: initialize
  };
});
define('tez-ui/initializers/local-storage', ['exports'], function (exports) {
  exports.initialize = initialize;
  /**
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function initialize(application) {
    application.inject('controller', 'localStorage', 'service:localStorage');
  }

  exports['default'] = {
    name: 'local-storage',
    initialize: initialize
  };
});
define('tez-ui/initializers/modals-container', ['exports', 'ember-bootstrap/initializers/modals-container'], function (exports, _emberBootstrapInitializersModalsContainer) {
  exports['default'] = _emberBootstrapInitializersModalsContainer['default'];
});
define("tez-ui/mixins/auto-counter-column", ["exports", "ember"], function (exports, _ember) {

  var MoreObject = more.Object;

  exports["default"] = _ember["default"].Mixin.create({
    columnSelectorMessage: "<span class='per-io'>Per-IO counter</span> selection wouldn't persist.",

    getCounterColumns: function getCounterColumns() {
      var columns = [],
          records = this.get("model"),
          counterHash = {};

      this._super().forEach(function (column) {
        var groupHash = counterHash[column.counterGroupName] = counterHash[column.counterGroupName] || {};
        groupHash[column.counterName] = column.counterName;
      });

      if (records) {
        records.forEach(function (record) {
          var counterGroupsHash = _ember["default"].get(record, 'counterGroupsHash');

          if (counterGroupsHash) {
            MoreObject.forEach(counterGroupsHash, function (groupName, countersHash) {
              var groupHash = counterHash[groupName] = counterHash[groupName] || {};

              MoreObject.forEach(countersHash, function (counterName) {
                groupHash[counterName] = counterName;
              });
            });
          }
        });
      }

      MoreObject.forEach(counterHash, function (groupName, counters) {
        MoreObject.forEach(counters, function (counterName) {
          columns.push({
            counterName: counterName,
            counterGroupName: groupName
          });
        });
      });

      return columns;
    }
  });
});
/*global more*/

/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/mixins/name", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Mixin.create({

    name: _ember["default"].computed(function () {
      var name = this.toString();
      name = name.substr(0, name.indexOf("::"));
      name = name.substr(name.indexOf(":") + 1);
      return name;
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/abstract', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    loadTime: null,

    mergedProperties: ["needs"],

    refreshLoadTime: function refreshLoadTime() {
      this.set('loadTime', new Date());
    },

    //TODO - Find a better alternative to detect property change in a model
    _notifyProperties: function _notifyProperties(keys) {
      this.refreshLoadTime();
      return this._super(keys);
    },

    didLoad: function didLoad() {
      this.refreshLoadTime();
    },

    entityID: _emberData['default'].attr("string"),

    index: _ember['default'].computed("entityID", function () {
      var id = this.get("entityID") || "";
      return id.substr(id.lastIndexOf('_') + 1);
    }),

    status: _emberData['default'].attr("string"),
    isComplete: _ember['default'].computed("status", function () {
      switch (this.get("status")) {
        case "SUCCEEDED":
        case "FINISHED":
        case "FAILED":
        case "KILLED":
          return true;
      }
      return false;
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/ahs-app', ['exports', 'ember', 'ember-data', 'tez-ui/models/abstract'], function (exports, _ember, _emberData, _tezUiModelsAbstract) {
  exports['default'] = _tezUiModelsAbstract['default'].extend({
    attemptID: _emberData['default'].attr('string'),

    name: _emberData['default'].attr('string'),
    queue: _emberData['default'].attr('string'),
    user: _emberData['default'].attr('string'),
    type: _emberData['default'].attr('string'),

    status: _emberData['default'].attr('string'),
    finalStatus: _emberData['default'].attr('string'),

    startTime: _emberData['default'].attr('number'),
    endTime: _emberData['default'].attr('number'),
    duration: _ember['default'].computed("startTime", "endTime", function () {
      var duration = this.get("endTime") - this.get("startTime");
      return duration > 0 ? duration : null;
    }),

    diagnostics: _emberData['default'].attr('string')
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/am-timeline', ['exports', 'ember', 'ember-data', 'tez-ui/models/timeline'], function (exports, _ember, _emberData, _tezUiModelsTimeline) {

  var MoreObject = more.Object;

  // For all AM related entities that can be updated from AM
  exports['default'] = _tezUiModelsTimeline['default'].extend({

    am: _emberData['default'].attr("object"), // Represents data from am

    status: _ember['default'].computed("am.status", "atsStatus", "app.status", "app.finalStatus", function () {
      return this.get("am.status") || this._super();
    }),

    progress: _ember['default'].computed("am.progress", "status", function () {
      var progress = this.get("am.progress");
      return MoreObject.isNumber(progress) ? progress : this._super();
    }),

    counterGroupsHash: _ember['default'].computed("am.counterGroupsHash", "_counterGroups", function () {
      var amCounters = this.get("am.counterGroupsHash"),
          atsCounters = this._super();
      return amCounters ? _ember['default'].$.extend({}, atsCounters, amCounters) : atsCounters;
    })
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/am', ['exports', 'ember-data', 'tez-ui/models/abstract'], function (exports, _emberData, _tezUiModelsAbstract) {
  exports['default'] = _tezUiModelsAbstract['default'].extend({

    entityID: _emberData['default'].attr("string"),

    status: _emberData['default'].attr("string"),
    progress: _emberData['default'].attr("number"),

    counterGroupsHash: _emberData['default'].attr("object")
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/app-rm', ['exports', 'tez-ui/models/rm'], function (exports, _tezUiModelsRm) {
  exports['default'] = _tezUiModelsRm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/app', ['exports', 'ember', 'ember-data', 'tez-ui/models/timeline'], function (exports, _ember, _emberData, _tezUiModelsTimeline) {
  exports['default'] = _tezUiModelsTimeline['default'].extend({
    needs: {
      app: {
        type: ["AhsApp", "appRm"],
        idKey: "appID",
        silent: true
      }
    },

    appID: _ember['default'].computed("entityID", function () {
      return this.get("entityID").substr(4);
    }),

    domain: _emberData['default'].attr("string"),

    user: _emberData['default'].attr("string"),

    buildTime: _emberData['default'].attr("string"),
    tezRevision: _emberData['default'].attr("string"),
    tezVersion: _emberData['default'].attr("string"),

    configs: _emberData['default'].attr("object")
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/attempt-am', ['exports', 'tez-ui/models/am'], function (exports, _tezUiModelsAm) {
  exports['default'] = _tezUiModelsAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/attempt', ['exports', 'ember', 'ember-data', 'tez-ui/models/am-timeline'], function (exports, _ember, _emberData, _tezUiModelsAmTimeline) {
  exports['default'] = _tezUiModelsAmTimeline['default'].extend({
    needs: {
      dag: {
        type: "dag",
        idKey: "dagID",
        silent: true
      },
      am: {
        type: "attemptAm",
        idKey: "entityID",
        loadType: "demand",
        queryParams: function queryParams(model) {
          var vertexIndex = parseInt(model.get("vertexIndex")),
              taskIndex = parseInt(model.get("taskIndex")),
              attemptIndex = parseInt(model.get("index"));
          return {
            attemptID: vertexIndex + '_' + taskIndex + '_' + attemptIndex,
            dagID: parseInt(model.get("dag.index")),
            counters: "*"
          };
        },
        urlParams: function urlParams(model) {
          return {
            app_id: model.get("appID")
          };
        }
      }
    },

    taskID: _emberData['default'].attr('string'),
    taskIndex: _ember['default'].computed("taskID", function () {
      var id = this.get("taskID") || "";
      return id.substr(id.lastIndexOf('_') + 1);
    }),

    vertexID: _emberData['default'].attr('string'),
    vertexIndex: _ember['default'].computed("vertexID", function () {
      var id = this.get("vertexID") || "";
      return id.substr(id.lastIndexOf('_') + 1);
    }),
    vertexName: _ember['default'].computed("vertexID", "dag", function () {
      var vertexID = this.get("vertexID");
      return this.get('dag.vertexIdNameMap.' + vertexID);
    }),

    dagID: _emberData['default'].attr('string'),
    dag: _emberData['default'].attr('object'), // Auto-loaded by need

    containerID: _emberData['default'].attr('string'),
    nodeID: _emberData['default'].attr('string'),

    logURL: _emberData['default'].attr('string')
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/dag-am', ['exports', 'tez-ui/models/am'], function (exports, _tezUiModelsAm) {
  exports['default'] = _tezUiModelsAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/dag', ['exports', 'ember', 'ember-data', 'tez-ui/models/am-timeline'], function (exports, _ember, _emberData, _tezUiModelsAmTimeline) {
  exports['default'] = _tezUiModelsAmTimeline['default'].extend({
    needs: {
      am: {
        type: "dagAm",
        idKey: "entityID",
        loadType: "demand",
        queryParams: function queryParams(model) {
          return {
            dagID: parseInt(model.get("index")),
            counters: "*"
          };
        },
        urlParams: function urlParams(model) {
          return {
            app_id: model.get("appID")
          };
        }
      },
      app: {
        type: ["AhsApp", "appRm"],
        idKey: "appID",
        silent: true
      }
    },

    name: _emberData['default'].attr("string"),

    submitter: _emberData['default'].attr("string"),

    // Serialize when required
    vertices: _emberData['default'].attr('object'),
    edges: _emberData['default'].attr('object'),
    vertexGroups: _emberData['default'].attr('object'),

    domain: _emberData['default'].attr("string"),
    containerLogs: _emberData['default'].attr("object"),
    queue: _ember['default'].computed("app", function () {
      return this.get("app.queue");
    }),

    vertexIdNameMap: _emberData['default'].attr("object"),

    callerID: _emberData['default'].attr("string"),
    callerType: _emberData['default'].attr("string"),
    callerInfo: _emberData['default'].attr("string")

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/rm', ['exports', 'ember-data', 'tez-ui/models/abstract'], function (exports, _emberData, _tezUiModelsAbstract) {
  exports['default'] = _tezUiModelsAbstract['default'].extend({
    entityID: _emberData['default'].attr("string"),
    status: _emberData['default'].attr("string")
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/task-am', ['exports', 'tez-ui/models/am'], function (exports, _tezUiModelsAm) {
  exports['default'] = _tezUiModelsAm['default'].extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/task', ['exports', 'ember', 'ember-data', 'tez-ui/models/am-timeline'], function (exports, _ember, _emberData, _tezUiModelsAmTimeline) {
  exports['default'] = _tezUiModelsAmTimeline['default'].extend({
    needs: {
      dag: {
        type: "dag",
        idKey: "dagID",
        silent: true
      },
      am: {
        type: "taskAm",
        idKey: "entityID",
        loadType: "demand",
        queryParams: function queryParams(model) {
          var vertexIndex = parseInt(model.get("vertexIndex")),
              taskIndex = parseInt(model.get("index"));
          return {
            taskID: vertexIndex + '_' + taskIndex,
            dagID: parseInt(model.get("dag.index")),
            counters: "*"
          };
        },
        urlParams: function urlParams(model) {
          return {
            app_id: model.get("appID")
          };
        }
      }
    },

    vertexID: _emberData['default'].attr('string'),
    vertexIndex: _ember['default'].computed("vertexID", function () {
      var id = this.get("vertexID") || "";
      return id.substr(id.lastIndexOf('_') + 1);
    }),
    vertexName: _ember['default'].computed("vertexID", "dag", function () {
      var vertexID = this.get("vertexID");
      return this.get('dag.vertexIdNameMap.' + vertexID);
    }),

    dagID: _emberData['default'].attr('string'),
    dag: _emberData['default'].attr('object'), // Auto-loaded by need

    failedTaskAttempts: _emberData['default'].attr('number')
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/timeline', ['exports', 'ember-data', 'ember', 'tez-ui/models/abstract'], function (exports, _emberData, _ember, _tezUiModelsAbstract) {
  exports['default'] = _tezUiModelsAbstract['default'].extend({

    needs: {
      app: {
        type: ["appRm", "AhsApp"],
        idKey: "appID",
        silent: true
      }
    },

    appID: _ember['default'].computed("entityID", function () {
      var idParts = this.get("entityID").split("_");
      return 'application_' + idParts[1] + '_' + idParts[2];
    }),
    app: _emberData['default'].attr("object"), // Either RMApp or AHSApp

    atsStatus: _emberData['default'].attr("string"),
    status: _ember['default'].computed("atsStatus", "app.status", "app.finalStatus", function () {
      var status = this.get("atsStatus"),
          yarnStatus = this.get("app.status");

      if (status !== 'RUNNING' || yarnStatus !== 'FINISHED' && yarnStatus !== 'KILLED' && yarnStatus !== 'FAILED') {
        return status;
      }

      if (yarnStatus === 'KILLED' || yarnStatus === 'FAILED') {
        return yarnStatus;
      }

      return this.get("app.finalStatus");
    }),

    progress: _ember['default'].computed("status", function () {
      return this.get("status") === "SUCCEEDED" ? 1 : null;
    }),

    startTime: _emberData['default'].attr("number"),
    endTime: _emberData['default'].attr("number"),
    duration: _ember['default'].computed("startTime", "endTime", function () {
      var duration = this.get("endTime") - this.get("startTime");
      return duration > 0 ? duration : null;
    }),

    // Hash will be created only on demand, till then counters will be stored in _counterGroups
    _counterGroups: _emberData['default'].attr('object'),
    counterGroupsHash: _ember['default'].computed("_counterGroups", function () {
      var counterHash = {},
          counterGroups = this.get("_counterGroups") || [];

      counterGroups.forEach(function (group) {
        var counters = group.counters,
            groupHash;

        groupHash = counterHash[group.counterGroupName] = counterHash[group.counterGroupName] || {};

        counters.forEach(function (counter) {
          groupHash[counter.counterName] = counter.counterValue;
        });
      });

      return counterHash;
    }),

    diagnostics: _emberData['default'].attr('string'),

    events: _emberData['default'].attr('object')

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/vertex-am', ['exports', 'ember-data', 'tez-ui/models/am'], function (exports, _emberData, _tezUiModelsAm) {
  exports['default'] = _tezUiModelsAm['default'].extend({

    totalTasks: _emberData['default'].attr("number"),
    succeededTasks: _emberData['default'].attr("number"),
    runningTasks: _emberData['default'].attr("number"),
    pendingTasks: _emberData['default'].attr("number"),
    failedTaskAttempts: _emberData['default'].attr("number"),
    killedTaskAttempts: _emberData['default'].attr("number"),

    initTime: _emberData['default'].attr('number'),
    startTime: _emberData['default'].attr('number'),
    endTime: _emberData['default'].attr('number'),
    firstTaskStartTime: _emberData['default'].attr('number'),
    lastTaskFinishTime: _emberData['default'].attr('number')

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/models/vertex', ['exports', 'ember', 'ember-data', 'tez-ui/models/am-timeline'], function (exports, _ember, _emberData, _tezUiModelsAmTimeline) {

  function valueComputerFactory(path1, path2) {
    return function () {
      var value = this.get(path1);
      if (value === undefined || value === null) {
        value = this.get(path2);
      }
      return value;
    };
  }

  exports['default'] = _tezUiModelsAmTimeline['default'].extend({
    needs: {
      dag: {
        type: "dag",
        idKey: "dagID",
        silent: true
      },
      am: {
        type: "vertexAm",
        idKey: "entityID",
        loadType: "demand",
        queryParams: function queryParams(model) {
          return {
            vertexID: parseInt(model.get("index")),
            dagID: parseInt(model.get("dag.index")),
            counters: "*"
          };
        },
        urlParams: function urlParams(model) {
          return {
            app_id: model.get("appID")
          };
        }
      }
    },

    name: _emberData['default'].attr('string'),

    _initTime: _emberData['default'].attr('number'),
    _startTime: _emberData['default'].attr('number'),
    _endTime: _emberData['default'].attr('number'),
    _firstTaskStartTime: _emberData['default'].attr('number'),
    _lastTaskFinishTime: _emberData['default'].attr('number'),

    initTime: _ember['default'].computed("am.initTime", "_initTime", valueComputerFactory("am.initTime", "_initTime")),
    startTime: _ember['default'].computed("am.startTime", "_startTime", valueComputerFactory("am.startTime", "_startTime")),
    endTime: _ember['default'].computed("am.endTime", "_endTime", valueComputerFactory("am.endTime", "_endTime")),
    firstTaskStartTime: _ember['default'].computed("am.firstTaskStartTime", "_firstTaskStartTime", valueComputerFactory("am.firstTaskStartTime", "_firstTaskStartTime")),
    lastTaskFinishTime: _ember['default'].computed("am.lastTaskFinishTime", "_lastTaskFinishTime", valueComputerFactory("am.lastTaskFinishTime", "_lastTaskFinishTime")),

    totalTasks: _emberData['default'].attr('number'),
    _failedTasks: _emberData['default'].attr('number'),
    _succeededTasks: _emberData['default'].attr('number'),
    _killedTasks: _emberData['default'].attr('number'),

    failedTasks: _ember['default'].computed("am.failedTasks", "_failedTasks", valueComputerFactory("am.failedTasks", "_failedTasks")),
    succeededTasks: _ember['default'].computed("am.succeededTasks", "_succeededTasks", valueComputerFactory("am.succeededTasks", "_succeededTasks")),
    killedTasks: _ember['default'].computed("am.killedTasks", "_killedTasks", valueComputerFactory("am.killedTasks", "_killedTasks")),

    finalStatus: _ember['default'].computed("status", "failedTaskAttempts", function () {
      var status = this.get("status");
      if (status === "SUCCEEDED" && this.get("failedTaskAttempts")) {
        status = "SUCCEEDED_WITH_FAILURES";
      }
      return status;
    }),

    runningTasks: _ember['default'].computed("am.runningTasks", "status", function () {
      var runningTasks = this.get("am.runningTasks");
      if (runningTasks === undefined) {
        runningTasks = this.get("status") === 'SUCCEEDED' ? 0 : null;
      }
      return runningTasks;
    }),
    pendingTasks: _ember['default'].computed("totalTasks", "succeededTasks", "runningTasks", function () {
      var pendingTasks = null,
          runningTasks = this.get("runningTasks"),
          totalTasks = this.get("totalTasks");
      if (totalTasks !== null && runningTasks !== null) {
        pendingTasks = totalTasks - this.get("succeededTasks") - runningTasks;
      }
      return pendingTasks;
    }),

    _failedTaskAttempts: _emberData['default'].attr('number'),
    _killedTaskAttempts: _emberData['default'].attr('number'),
    failedTaskAttempts: _ember['default'].computed("am.failedTaskAttempts", "_failedTaskAttempts", valueComputerFactory("am.failedTaskAttempts", "_failedTaskAttempts")),
    killedTaskAttempts: _ember['default'].computed("am.killedTaskAttempts", "_killedTaskAttempts", valueComputerFactory("am.killedTaskAttempts", "_killedTaskAttempts")),

    minDuration: _emberData['default'].attr('number'),
    maxDuration: _emberData['default'].attr('number'),
    avgDuration: _emberData['default'].attr('number'),

    firstTasksToStart: _emberData['default'].attr("object"),
    lastTasksToFinish: _emberData['default'].attr("object"),
    shortestDurationTasks: _emberData['default'].attr("object"),
    longestDurationTasks: _emberData['default'].attr("object"),

    processorClassName: _emberData['default'].attr('string'),

    dagID: _emberData['default'].attr('string'),
    dag: _emberData['default'].attr('object') });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Auto-loaded by need
define('tez-ui/router', ['exports', 'ember', 'tez-ui/config/environment'], function (exports, _ember, _tezUiConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _tezUiConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    this.route('dags', { path: '/' });
    this.route('dag', { path: '/dag/:dag_id' }, function () {
      this.route('vertices');
      this.route('tasks');
      this.route('attempts');
      this.route('counters');
      this.route('index', { path: '/' }, function () {});
      this.route('graphical');
      this.route('swimlane');
    });
    this.route('vertex', { path: '/vertex/:vertex_id' }, function () {
      this.route('tasks');
      this.route('attempts');
      this.route('counters');
    });
    this.route('task', { path: '/task/:task_id' }, function () {
      this.route('attempts');
      this.route('counters');
    });
    this.route('attempt', { path: '/attempt/:attempt_id' }, function () {
      this.route('counters');
    });
    // Alias for backward compatibility with Tez UI V1
    this.route('app', { path: '/tez-app/:app_id' }, function () {});
    this.route('app', { path: '/app/:app_id' }, function () {
      this.route('dags');
      this.route('configs');
    });
    this.route('multi-am-pollster');
    this.route('single-am-pollster');
  });

  exports['default'] = Router;
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/abstract', ['exports', 'ember', 'ember-data', 'tez-ui/services/loader', 'tez-ui/errors/unlinked-promise', 'tez-ui/mixins/name'], function (exports, _ember, _emberData, _tezUiServicesLoader, _tezUiErrorsUnlinkedPromise, _tezUiMixinsName) {

  var MoreObject = more.Object;

  exports['default'] = _ember['default'].Route.extend(_tezUiMixinsName['default'], {
    title: null, // Must be set by inheriting class

    loaderNamespace: null,
    isLoading: false,
    currentPromiseId: null,
    loadedValue: null,

    isLeafRoute: false,
    breadcrumbs: null,
    childCrumbs: null,

    currentQuery: {},

    loaderQueryParams: {},

    init: function init() {
      var namespace = this.get("loaderNamespace");
      if (namespace) {
        this.setLoader(namespace);
      }
    },

    model: function model(params /*, transition*/) {
      this.set("currentQuery", this.queryFromParams(params));
      _ember['default'].run.later(this, "loadData");
    },

    queryFromParams: function queryFromParams(params) {
      var query = {};

      MoreObject.forEach(this.get("loaderQueryParams"), function (name, paramKey) {
        var value = _ember['default'].get(params, paramKey);
        if (value) {
          query[name] = value;
        }
      });

      return query;
    },

    setDocTitle: function setDocTitle() {
      _ember['default'].$(document).attr('title', "Tez UI : " + this.get('title'));
    },

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      this.setDocTitle();
    },

    checkAndCall: function checkAndCall(id, functionName, query, options, value) {
      if (id === this.get("currentPromiseId")) {
        return this[functionName](value, query, options);
      } else {
        throw new _tezUiErrorsUnlinkedPromise['default']();
      }
    },

    loadData: function loadData(options) {
      var promiseId = Math.random(),
          query = this.get("currentQuery");

      options = options || {};

      this.set('currentPromiseId', promiseId);

      return _ember['default'].RSVP.resolve().then(this.checkAndCall.bind(this, promiseId, "setLoading", query, options)).then(this.checkAndCall.bind(this, promiseId, "beforeLoad", query, options)).then(this.checkAndCall.bind(this, promiseId, "load", query, options)).then(this.checkAndCall.bind(this, promiseId, "afterLoad", query, options)).then(this.checkAndCall.bind(this, promiseId, "setValue", query, options))['catch'](this.onLoadFailure.bind(this));
    },

    setLoading: function setLoading() /*query, options*/{
      this.set('isLoading', true);
      this.set('controller.isLoading', true);
    },
    beforeLoad: function beforeLoad(value /*, query, options*/) {
      return value;
    },
    load: function load(value /*, query, options*/) {
      return value;
    },
    afterLoad: function afterLoad(value /*, query, options*/) {
      return value;
    },
    setValue: function setValue(value /*, query, options*/) {
      this.set('loadedValue', value);

      this.set('isLoading', false);
      this.set('controller.isLoading', false);

      this.send("setLoadTime", this.getLoadTime(value));

      return value;
    },
    onLoadFailure: function onLoadFailure(error) {
      if (error instanceof _tezUiErrorsUnlinkedPromise['default']) {
        _ember['default'].Logger.warn("Slow down, you are refreshing too fast!");
      } else {
        this.send("error", error);
        throw error;
      }
    },

    getLoadTime: function getLoadTime(value) {
      if (value instanceof _emberData['default'].RecordArray) {
        value = value.get("content.0.record");
      } else if (Array.isArray(value)) {
        value = value[0];
      }

      if (value) {
        return _ember['default'].get(value, "loadTime");
      }
    },

    _setControllerModel: _ember['default'].observer("loadedValue", function () {
      var controller = this.get("controller");
      if (controller) {
        controller.set("model", this.get("loadedValue"));
      }
    }),

    setLoader: function setLoader(nameSpace) {
      this.set("loader", _tezUiServicesLoader['default'].create({
        nameSpace: nameSpace,
        store: this.get("store"),
        container: this.get("container")
      }));
    },

    startCrumbBubble: function startCrumbBubble() {
      this.send("bubbleBreadcrumbs", []);
    },

    actions: {
      setBreadcrumbs: function setBreadcrumbs(crumbs) {
        var name = this.get("name");
        if (crumbs && crumbs[name]) {
          this.set("breadcrumbs", crumbs[name]);
        }
        return true;
      },
      bubbleBreadcrumbs: function bubbleBreadcrumbs(crumbs) {
        crumbs.unshift.apply(crumbs, this.get("breadcrumbs"));
        return true;
      },
      reload: function reload() {
        _ember['default'].run.later(this, "loadData", { reload: true });
      },
      willTransition: function willTransition() {
        this.set("loadedValue", null);
      }
    }
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/am-pollster', ['exports', 'ember', 'tez-ui/routes/pollster'], function (exports, _ember, _tezUiRoutesPollster) {

  var MoreObject = more.Object;

  exports['default'] = _tezUiRoutesPollster['default'].extend({

    countersToPoll: null,

    onRecordPoll: function onRecordPoll(record) {
      var query = {},
          countersToPoll = this.get("countersToPoll");

      if (countersToPoll !== null) {
        query.counters = countersToPoll;
      }

      return this.get("loader").loadNeed(record, "am", { reload: true }, query);
    },

    onPollFailure: function onPollFailure(error) {
      var that = this,
          record = this.get("polledRecords.0");

      this.get("loader").queryRecord("appRm", record.get("appID"), { reload: true }).then(function (appRm) {
        if (appRm.get('isComplete')) {
          that.scheduleReload();
        } else {
          that.send("error", error);
        }
      }, function (error) {
        that.send("error", error);
        that.scheduleReload();
      });
    },

    scheduleReload: function scheduleReload() {
      this.set("polledRecords", null);
      _ember['default'].run.debounce(this, "reload", this.get("polling.interval") * 2);
    },

    reload: function reload() {
      this.set("polledRecords", null);
      this.send("reload");
    },

    actions: {
      countersToPollChanged: function countersToPollChanged(counterColumnDefinitions) {
        var counterGroupHash = {},
            counterGroups = [];

        if (counterColumnDefinitions) {
          counterColumnDefinitions.forEach(function (definition) {
            var counterGroupName = definition.get("counterGroupName"),
                counterNames = counterGroupHash[counterGroupName];
            if (!counterNames) {
              counterNames = counterGroupHash[counterGroupName] = [];
            }
            counterNames.push(definition.get("counterName"));
          });

          MoreObject.forEach(counterGroupHash, function (groupName, counters) {
            counters = counters.join(",");
            counterGroups.push(groupName + '/' + counters);
          });
        }

        this.set("countersToPoll", counterGroups.join(";"));
      }
    }

  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/app", ["exports", "tez-ui/routes/abstract"], function (exports, _tezUiRoutesAbstract) {
  exports["default"] = _tezUiRoutesAbstract["default"].extend({
    title: "Application",

    loaderQueryParams: {
      id: "app_id"
    },

    model: function model(params) {
      return this.get("loader").queryRecord('app', "tez_" + this.queryFromParams(params).id)["catch"](this.onLoadFailure.bind(this));
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/app/configs', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "Application Details",

    loaderNamespace: "app",

    canPoll: false,

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('app', this.modelFor("app").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/app/dags', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "DAGs",

    loaderNamespace: "app",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('dag', {
        appID: this.modelFor("app").get("appID")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/app/index', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "Application Details",

    loaderNamespace: "app",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    onRecordPoll: function onRecordPoll() {
      this.reload();
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('app', this.modelFor("app").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/application", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Route.extend({
    title: "Application",

    pageReset: function pageReset() {
      this.send("resetTooltip");
    },

    actions: {
      didTransition: function didTransition() /* transition */{
        this.pageReset();
      },
      bubbleBreadcrumbs: function bubbleBreadcrumbs(breadcrumbs) {
        this.set("controller.breadcrumbs", breadcrumbs);
      },

      error: function error(_error) {
        this.set("controller.appError", _error);
        _ember["default"].Logger.error(_error);
      },

      resetTooltip: function resetTooltip() {
        _ember["default"].$(document).tooltip("destroy");
        _ember["default"].$(document).tooltip({
          delay: 20,
          tooltipClass: 'generic-tooltip'
        });
      },

      // Modal window actions
      openModal: function openModal(componentName, options) {
        options = options || {};

        if (typeof componentName === "object") {
          options = componentName;
          componentName = null;
        }

        this.render(options.modalName || "simple-modal", {
          into: 'application',
          outlet: 'modal',
          model: {
            title: options.title,
            componentName: componentName,
            content: options.content,
            targetObject: options.targetObject
          }
        });
        _ember["default"].run.later(function () {
          _ember["default"].$(".simple-modal").modal();
        });
      },
      closeModal: function closeModal() {
        _ember["default"].$(".simple-modal").modal("hide");
      },
      destroyModal: function destroyModal() {
        _ember["default"].run.later(this, function () {
          this.disconnectOutlet({
            outlet: 'modal',
            parentView: 'application'
          });
        });
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/attempt", ["exports", "tez-ui/routes/abstract"], function (exports, _tezUiRoutesAbstract) {
  exports["default"] = _tezUiRoutesAbstract["default"].extend({
    title: "Attempt",

    loaderQueryParams: {
      id: "attempt_id"
    },

    model: function model(params) {
      return this.get("loader").queryRecord('attempt', this.queryFromParams(params).id)["catch"](this.onLoadFailure.bind(this));
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/attempt/counters', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "attempt",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('attempt', this.modelFor("attempt").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/attempt/index', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "attempt",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('attempt', this.modelFor("attempt").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/dag", ["exports", "tez-ui/routes/abstract"], function (exports, _tezUiRoutesAbstract) {
  exports["default"] = _tezUiRoutesAbstract["default"].extend({
    title: "DAG",

    loaderQueryParams: {
      id: "dag_id"
    },

    model: function model(params) {
      return this.get("loader").queryRecord('dag', this.queryFromParams(params).id)["catch"](this.onLoadFailure.bind(this));
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/attempts', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "All Task Attempts",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('attempt', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/counters', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('dag', this.modelFor("dag").get("id"), options);
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/graphical', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "Graphical View",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('vertex', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    },

    _loadedValueObserver: _ember['default'].observer("loadedValue", function () {
      var loadedValue = this.get("loadedValue"),
          records = [];

      if (loadedValue) {
        loadedValue.forEach(function (record) {
          records.push(record);
        });

        this.set("polledRecords", records);
      }
      _ember['default'].run.later(this, "setViewHeight", 100);
    }),

    setViewHeight: function setViewHeight() {
      var container = _ember['default'].$('#graphical-view-component-container'),
          offset;

      if (container) {
        offset = container.offset();
        container.height(Math.max(
        // 50 pixel is left at the bottom
        offset ? _ember['default'].$(window).height() - offset.top - 70 : 0, 500 // Minimum dag view component container height
        ));
      }
    },

    actions: {
      didTransition: function didTransition() {
        _ember['default'].$(window).on('resize', this.setViewHeight);
        this._super();
        return true;
      },
      willTransition: function willTransition() {
        _ember['default'].$(window).off('resize', this.setViewHeight);
        this._super();
        return true;
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/index', ['exports', 'ember', 'tez-ui/routes/single-am-pollster', 'tez-ui/utils/download-dag-zip'], function (exports, _ember, _tezUiRoutesSingleAmPollster, _tezUiUtilsDownloadDagZip) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('dag', this.modelFor("dag").get("id"), options);
    },

    actions: {
      downloadDagJson: function downloadDagJson() {
        var dag = this.get("loadedValue"),
            downloader = (0, _tezUiUtilsDownloadDagZip['default'])(dag, {
          batchSize: 500,
          timelineHost: this.get("hosts.timeline"),
          timelineNamespace: this.get("env.app.namespaces.webService.timeline")
        }),
            modalContent = _ember['default'].Object.create({
          dag: dag,
          downloader: downloader
        });

        this.send("openModal", "zip-download-modal", {
          title: "Download data",
          content: modalContent
        });
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/index/index', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('vertex', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    },

    _canPollObserver: _ember['default'].observer("canPoll", function () {
      if (this.get("canPoll")) {
        this.get("polling").setPoll(this.pollData, this, "dag.index.index");
      } else {
        this.get("polling").resetPoll("dag.index.index");
      }
    }),

    updateLoadTime: function updateLoadTime(value) {
      return value;
    },

    actions: {
      reload: function reload() {
        this._super();
        return true;
      },
      willTransition: function willTransition() {
        this.set("loadedValue", null);
        return true;
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/swimlane', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "Vertex Swimlane",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('vertex', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    },

    _loadedValueObserver: _ember['default'].observer("loadedValue", function () {
      var loadedValue = this.get("loadedValue"),
          records = [];

      if (loadedValue) {
        loadedValue.forEach(function (record) {
          records.push(record);
        });

        this.set("polledRecords", records);
      }
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/tasks', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "All Tasks",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('task', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dag/vertices', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "All Vertices",

    loaderNamespace: "dag",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('vertex', {
        dagID: this.modelFor("dag").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/dags', ['exports', 'ember', 'tez-ui/routes/abstract'], function (exports, _ember, _tezUiRoutesAbstract) {

  var REFRESH = { refreshModel: true };

  exports['default'] = _tezUiRoutesAbstract['default'].extend({
    title: "All DAGs",

    queryParams: {
      dagName: REFRESH,
      dagID: REFRESH,
      submitter: REFRESH,
      status: REFRESH,
      appID: REFRESH,
      callerID: REFRESH,

      rowCount: REFRESH
    },

    loaderQueryParams: {
      dagName: "dagName",
      dagID: "dagID",
      user: "submitter",
      status: "status",
      appID: "appID",
      callerID: "callerID",

      limit: "rowCount"
    },

    loaderNamespace: "dags",

    fromId: null,

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    // Client side filtering to ensure that records are relevant after status correction
    filterRecords: function filterRecords(records, query) {
      query = {
        name: query.dagName,
        entityID: query.dagID,
        submitter: query.submitter,
        status: query.status,
        appID: query.appID,
        callerID: query.callerID
      };

      return records.filter(function (record) {
        for (var propName in query) {
          if (query[propName] && query[propName] !== record.get(propName)) {
            return false;
          }
        }
        return true;
      });
    },

    load: function load(value, query /*, options*/) {
      var loader,
          that = this,
          limit = this.get("controller.rowCount") || query.limit;

      if (query.dagID) {
        that.set("loadedRecords", []);
        loader = this.get("loader").queryRecord('dag', query.dagID, { reload: true }).then(function (record) {
          return [record];
        });
      } else {
        query = _ember['default'].$.extend({}, query, {
          limit: limit + 1
        });
        loader = this.get("loader").query('dag', query, { reload: true });
      }

      return loader.then(function (records) {

        if (records.get("length") > limit) {
          var lastRecord = records.popObject();
          that.set("controller.moreAvailable", true);
          that.set("fromId", lastRecord.get("entityID"));
        } else {
          that.set("controller.moreAvailable", false);
        }

        records = that.filterRecords(records, query);
        records.forEach(function (record) {
          if (record.get("status") === "RUNNING") {
            that.get("loader").loadNeed(record, "am", { reload: true })['catch'](function () {
              record.set("am", null);
            });
          }
        });
        return records;
      });
    },

    loadNewPage: function loadNewPage() {
      var query = this.get("currentQuery"),
          that = this;

      query = _ember['default'].$.extend({}, query, {
        fromId: this.get("fromId")
      });

      this.set("controller.loadingMore", true);
      return this.load(null, query).then(function (data) {
        if (that.get("controller.loadingMore")) {
          that.set("controller.loadingMore", false);
          that.get("loadedValue").pushObjects(data);
          return data;
        }
      });
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      },
      loadPage: function loadPage(page) {
        var that = this;
        if (this.get("controller.moreAvailable") && !this.get("controller.loadingMore")) {
          this.send("resetTooltip");
          this.loadNewPage().then(function (data) {
            if (data) {
              that.set("controller.pageNum", page);
            }
            return data;
          });
        }
      },
      reload: function reload() {
        this.set("controller.loadingMore", false);
        this.set("controller.pageNum", 1);
        this._super();
      },
      willTransition: function willTransition() {
        var loader = this.get("loader");
        loader.unloadAll("dag");
        loader.unloadAll("ahs-app");
        this._super();
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/multi-am-pollster', ['exports', 'ember', 'tez-ui/routes/am-pollster'], function (exports, _ember, _tezUiRoutesAmPollster) {
  exports['default'] = _tezUiRoutesAmPollster['default'].extend({

    canPoll: _ember['default'].computed("polledRecords.0.app.isComplete", "loadedValue", function () {
      var isComplete = this.get("polledRecords.0.app.isComplete");
      return isComplete === false && this._super();
    }),

    actions: {
      setPollingRecords: function setPollingRecords(records) {
        this.set("polledRecords", records);
      }
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/pollster', ['exports', 'ember', 'tez-ui/routes/abstract'], function (exports, _ember, _tezUiRoutesAbstract) {
  exports['default'] = _tezUiRoutesAbstract['default'].extend({
    polling: _ember['default'].inject.service("pollster"),

    // Todo - Change name to recordsToPoll
    polledRecords: null,

    // Must be implemented by inheriting classes
    onRecordPoll: function onRecordPoll(val) {
      return val;
    },
    onPollSuccess: function onPollSuccess(val) {
      return val;
    },
    onPollFailure: function onPollFailure(err) {
      throw err;
    },

    pollData: function pollData() {
      var polledRecords = this.get("polledRecords");

      if (!this.get("isLoading") && polledRecords) {
        polledRecords = polledRecords.map(this.onRecordPoll.bind(this));
        return _ember['default'].RSVP.all(polledRecords).then(this.updateLoadTime.bind(this)).then(this.onPollSuccess.bind(this), this.onPollFailure.bind(this));
      }
      return _ember['default'].RSVP.reject();
    },

    canPoll: _ember['default'].computed("polledRecords", "loadedValue", function () {
      return this.get("polledRecords") && this.get("loadedValue");
    }),

    updateLoadTime: function updateLoadTime(value) {
      this.send("setLoadTime", this.getLoadTime(value));
      return value;
    },

    _canPollInit: _ember['default'].on("init", function () {
      // This sets a flag that ensures that the _canPollObserver is called whenever
      // canPoll changes. By default observers on un-used computed properties
      // are not called.
      this.get("canPoll");
    }),

    _canPollObserver: _ember['default'].observer("canPoll", function () {
      if (this.get("canPoll")) {
        this.get("polling").setPoll(this.pollData, this);
      } else {
        this.get("polling").resetPoll();
      }
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/single-am-pollster', ['exports', 'ember', 'tez-ui/routes/am-pollster'], function (exports, _ember, _tezUiRoutesAmPollster) {
  exports['default'] = _tezUiRoutesAmPollster['default'].extend({

    canPoll: _ember['default'].computed("polledRecords", "loadedValue.app.isComplete", function () {
      var isComplete = this.get("loadedValue.app.isComplete");
      return isComplete === false && this._super();
    }),

    _loadedValueObserver: _ember['default'].observer("loadedValue.loadTime", function () {
      var loadedValue = this.get("loadedValue");
      this.set("polledRecords", loadedValue ? [this.get("loadedValue")] : null);
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/task", ["exports", "tez-ui/routes/abstract"], function (exports, _tezUiRoutesAbstract) {
  exports["default"] = _tezUiRoutesAbstract["default"].extend({
    title: "Task",

    loaderQueryParams: {
      id: "task_id"
    },

    model: function model(params) {
      return this.get("loader").queryRecord('task', this.queryFromParams(params).id)["catch"](this.onLoadFailure.bind(this));
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/task/attempts', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "Task Attempts",

    loaderNamespace: "task",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('attempt', {
        taskID: this.modelFor("task").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/task/counters', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "task",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('task', this.modelFor("task").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/task/index', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "task",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    loadAttempts: function loadAttempts(taskID, options) {
      var that = this;

      this.get("loader").query('attempt', {
        taskID: taskID
      }, options).then(function (attempts) {
        that.set("controller.attempts", attempts);
      });
    },

    load: function load(value, query, options) {
      var taskID = this.modelFor("task").get("id");
      this.loadAttempts(taskID, options);
      return this.get("loader").queryRecord('task', taskID, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/routes/vertex", ["exports", "tez-ui/routes/abstract"], function (exports, _tezUiRoutesAbstract) {
  exports["default"] = _tezUiRoutesAbstract["default"].extend({
    title: "Vertex",

    loaderQueryParams: {
      id: "vertex_id"
    },

    model: function model(params) {
      return this.get("loader").queryRecord('vertex', this.queryFromParams(params).id)["catch"](this.onLoadFailure.bind(this));
    },

    actions: {
      setLoadTime: function setLoadTime(time) {
        this.set("controller.loadTime", time);
      }
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/vertex/attempts', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "Task Attempts",

    loaderNamespace: "vertex",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('attempt', {
        vertexID: this.modelFor("vertex").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/vertex/counters', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "vertex",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('vertex', this.modelFor("vertex").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/vertex/index', ['exports', 'ember', 'tez-ui/routes/single-am-pollster'], function (exports, _ember, _tezUiRoutesSingleAmPollster) {
  exports['default'] = _tezUiRoutesSingleAmPollster['default'].extend({
    title: "DAG Details",

    loaderNamespace: "vertex",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").queryRecord('vertex', this.modelFor("vertex").get("id"), options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/routes/vertex/tasks', ['exports', 'ember', 'tez-ui/routes/multi-am-pollster'], function (exports, _ember, _tezUiRoutesMultiAmPollster) {
  exports['default'] = _tezUiRoutesMultiAmPollster['default'].extend({
    title: "All Tasks",

    loaderNamespace: "vertex",

    setupController: function setupController(controller, model) {
      this._super(controller, model);
      _ember['default'].run.later(this, "startCrumbBubble");
    },

    load: function load(value, query, options) {
      return this.get("loader").query('task', {
        vertexID: this.modelFor("vertex").get("id")
      }, options);
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/ahs-app', ['exports', 'ember', 'tez-ui/serializers/loader'], function (exports, _ember, _tezUiSerializersLoader) {
  exports['default'] = _tezUiSerializersLoader['default'].extend({
    primaryKey: 'appId',

    extractArrayPayload: function extractArrayPayload(payload) {
      return payload.app;
    },

    maps: {
      entityID: 'appId',
      attemptID: function attemptID(source) {
        // while an attempt is in progress the attempt id contains a '-'
        return (_ember['default'].get(source, 'currentAppAttemptId') || '').replace('-', '');
      },

      name: 'name',
      queue: 'queue',
      user: 'user',
      type: 'type',

      status: 'appState',
      finalStatus: 'finalAppStatus',

      startTime: 'startedTime',
      endTime: 'finishedTime',

      diagnostics: 'otherinfo.diagnostics'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/am', ['exports', 'tez-ui/serializers/loader'], function (exports, _tezUiSerializersLoader) {
  exports['default'] = _tezUiSerializersLoader['default'].extend({
    primaryKey: 'id',

    payloadNamespace: null, // Must be set by inheriting classes

    extractSinglePayload: function extractSinglePayload(rawPayload) {
      return rawPayload[this.get("payloadNamespace")][0];
    },
    extractArrayPayload: function extractArrayPayload(rawPayload) {
      return rawPayload[this.get("payloadNamespace")];
    },

    maps: {
      entityID: 'id',

      status: 'status',
      progress: 'progress',

      counterGroupsHash: 'counters'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/app-rm', ['exports', 'ember', 'tez-ui/serializers/rm'], function (exports, _ember, _tezUiSerializersRm) {
  exports['default'] = _tezUiSerializersRm['default'].extend({

    extractSinglePayload: function extractSinglePayload(rawPayload) {
      return _ember['default'].get(rawPayload, "app");
    },

    extractArrayPayload: function extractArrayPayload(rawPayload) {
      return _ember['default'].get(rawPayload, "apps.app");
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/app', ['exports', 'tez-ui/serializers/timeline'], function (exports, _tezUiSerializersTimeline) {
  exports['default'] = _tezUiSerializersTimeline['default'].extend({
    maps: {
      domain: 'domain',
      user: 'otherinfo.user',

      buildTime: 'otherinfo.tezVersion.buildTime',
      tezRevision: 'otherinfo.tezVersion.revision',
      tezVersion: 'otherinfo.tezVersion.version',

      configs: 'otherinfo.config'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/serializers/attempt-am", ["exports", "tez-ui/serializers/am"], function (exports, _tezUiSerializersAm) {
  exports["default"] = _tezUiSerializersAm["default"].extend({
    payloadNamespace: "attempts"
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/attempt', ['exports', 'ember', 'tez-ui/serializers/timeline'], function (exports, _ember, _tezUiSerializersTimeline) {

  function createLogURL(source) {
    var logURL = _ember['default'].get(source, 'otherinfo.inProgressLogsURL'),
        attemptID = _ember['default'].get(source, 'entity'),
        yarnProtocol = this.get('env.app.yarnProtocol');

    if (logURL) {
      return yarnProtocol + '://' + logURL + '/syslog_' + attemptID;
    }
  }

  exports['default'] = _tezUiSerializersTimeline['default'].extend({
    maps: {
      taskID: 'primaryfilters.TEZ_TASK_ID.0',
      vertexID: 'primaryfilters.TEZ_VERTEX_ID.0',
      dagID: 'primaryfilters.TEZ_DAG_ID.0',

      containerID: 'otherinfo.containerId',
      nodeID: 'otherinfo.nodeId',

      logURL: createLogURL
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/dag-am', ['exports', 'tez-ui/serializers/am'], function (exports, _tezUiSerializersAm) {
  exports['default'] = _tezUiSerializersAm['default'].extend({
    extractSinglePayload: function extractSinglePayload(rawPayload) {
      return rawPayload.dag;
    },
    extractArrayPayload: function extractArrayPayload(rawPayload) {
      return rawPayload.dag;
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/dag', ['exports', 'ember', 'tez-ui/serializers/timeline'], function (exports, _ember, _tezUiSerializersTimeline) {

  var MoreObject = more.Object;

  function getStatus(source) {
    var status = _ember['default'].get(source, 'otherinfo.status') || _ember['default'].get(source, 'primaryfilters.status.0'),
        event = source.events;

    if (!status && event) {
      if (event.findBy('eventtype', 'DAG_STARTED')) {
        status = 'RUNNING';
      }
    }

    return status;
  }

  function getStartTime(source) {
    var time = _ember['default'].get(source, 'otherinfo.startTime'),
        event = source.events;

    if (!time && event) {
      event = event.findBy('eventtype', 'DAG_STARTED');
      if (event) {
        time = event.timestamp;
      }
    }

    return time;
  }

  function getEndTime(source) {
    var time = _ember['default'].get(source, 'otherinfo.endTime'),
        event = source.events;

    if (!time && event) {
      event = event.findBy('eventtype', 'DAG_FINISHED');
      if (event) {
        time = event.timestamp;
      }
    }

    return time;
  }

  function getContainerLogs(source) {
    var containerLogs = [],
        otherinfo = _ember['default'].get(source, 'otherinfo');

    if (!otherinfo) {
      return undefined;
    }

    for (var key in otherinfo) {
      if (key.indexOf('inProgressLogsURL_') === 0) {
        var logs = _ember['default'].get(source, 'otherinfo.' + key);
        if (logs.indexOf('http') !== 0) {
          logs = 'http://' + logs;
        }
        var attemptID = key.substring(18);
        containerLogs.push({
          text: attemptID,
          href: logs
        });
      }
    }

    return containerLogs;
  }

  function getIdNameMap(source) {
    var nameIdMap = _ember['default'].get(source, 'otherinfo.vertexNameIdMapping'),
        idNameMap = {};

    if (nameIdMap) {
      MoreObject.forEach(nameIdMap, function (name, id) {
        idNameMap[id] = name;
      });
    }

    return idNameMap;
  }

  exports['default'] = _tezUiSerializersTimeline['default'].extend({
    maps: {
      name: 'primaryfilters.dagName.0',

      submitter: 'primaryfilters.user.0',

      atsStatus: getStatus,
      // progress

      startTime: getStartTime,
      endTime: getEndTime,
      // duration

      vertices: 'otherinfo.dagPlan.vertices',
      edges: 'otherinfo.dagPlan.edges',
      vertexGroups: 'otherinfo.dagPlan.vertexGroups',

      // appID
      domain: 'domain',
      // queue
      containerLogs: getContainerLogs,

      vertexIdNameMap: getIdNameMap,

      callerID: 'primaryfilters.callerId.0',
      callerType: 'callerType',
      callerInfo: 'callerInfo'
    },

    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var data = resourceHash.data,
          dagInfo = _ember['default'].get(resourceHash, "data.otherinfo.dagPlan.dagInfo");

      if (dagInfo) {
        var infoObj = {};
        try {
          infoObj = JSON.parse(dagInfo);
        } catch (e) {}

        data.callerType = _ember['default'].get(infoObj, "context");
        data.callerInfo = _ember['default'].get(infoObj, "description") || _ember['default'].get(dagInfo, "blob") || dagInfo;
      }

      return this._super(modelClass, resourceHash);
    }

  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/loader', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {

  var MoreObject = more.Object;

  // TODO - Move to more js
  function mapObject(hash, map, thisArg) {
    var mappedObject = _ember['default'].Object.create();
    MoreObject.forEach(map, function (key, value) {
      if (MoreObject.isString(value)) {
        mappedObject.set(key, _ember['default'].get(hash, value));
      } else if (MoreObject.isFunction(value)) {
        mappedObject.set(key, value.call(thisArg, hash));
      } else {
        _ember['default'].assert("Unknown mapping value");
      }
    });
    return mappedObject;
  }

  exports['default'] = _emberData['default'].JSONSerializer.extend({
    _isLoader: true,

    mergedProperties: ["maps"],
    maps: null,

    extractId: function extractId(modelClass, resourceHash) {
      var id = this._super(modelClass, resourceHash.data),
          nameSpace = resourceHash.nameSpace;

      if (nameSpace) {
        return nameSpace + ":" + id;
      }
      return id;
    },
    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var maps = this.get('maps'),
          data = resourceHash.data;
      return this._super(modelClass, maps ? mapObject(data, maps, this) : data);
    },
    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      return this._super(modelClass, resourceHash.data);
    },

    extractSinglePayload: function extractSinglePayload(payload) {
      return payload;
    },
    extractArrayPayload: function extractArrayPayload(payload) {
      return payload;
    },

    normalizeSingleResponse: function normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
      payload.data = this.extractSinglePayload(payload.data);
      return this._super(store, primaryModelClass, payload, id, requestType);
    },

    normalizeArrayResponse: function normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
      var nameSpace = payload.nameSpace;

      // convert into a _normalizeResponse friendly format
      payload = this.extractArrayPayload(payload.data);
      _ember['default'].assert("Loader expects an array in return for a query", Array.isArray(payload));
      payload = payload.map(function (item) {
        return {
          nameSpace: nameSpace,
          data: item
        };
      });

      return this._super(store, primaryModelClass, payload, id, requestType);
    }
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/rm', ['exports', 'tez-ui/serializers/loader'], function (exports, _tezUiSerializersLoader) {
  exports['default'] = _tezUiSerializersLoader['default'].extend({
    primaryKey: 'id',

    maps: {
      entityID: 'id',
      status: 'state'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/serializers/task-am", ["exports", "tez-ui/serializers/am"], function (exports, _tezUiSerializersAm) {
  exports["default"] = _tezUiSerializersAm["default"].extend({
    payloadNamespace: "tasks"
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/task', ['exports', 'tez-ui/serializers/timeline'], function (exports, _tezUiSerializersTimeline) {
  exports['default'] = _tezUiSerializersTimeline['default'].extend({
    maps: {
      vertexID: 'primaryfilters.TEZ_VERTEX_ID.0',
      dagID: 'primaryfilters.TEZ_DAG_ID.0',

      failedTaskAttempts: 'otherinfo.numFailedTaskAttempts'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/timeline', ['exports', 'ember', 'tez-ui/serializers/loader'], function (exports, _ember, _tezUiSerializersLoader) {

  function getDiagnostics(source) {
    var diagnostics = _ember['default'].get(source, 'otherinfo.diagnostics') || "";

    diagnostics = diagnostics.replace(/\t/g, "&emsp;&emsp;");
    diagnostics = diagnostics.replace(/\[/g, "<div>&#187; ");
    diagnostics = diagnostics.replace(/\]/g, "</div>");

    return diagnostics;
  }

  exports['default'] = _tezUiSerializersLoader['default'].extend({
    primaryKey: 'entity',

    extractArrayPayload: function extractArrayPayload(payload) {
      return payload.entities;
    },

    maps: {
      entityID: 'entity',

      atsStatus: 'otherinfo.status',

      startTime: 'otherinfo.startTime',
      endTime: 'otherinfo.endTime',

      diagnostics: getDiagnostics,

      events: 'events',

      _counterGroups: 'otherinfo.counters.counterGroups'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/serializers/vertex-am", ["exports", "tez-ui/serializers/am"], function (exports, _tezUiSerializersAm) {
  exports["default"] = _tezUiSerializersAm["default"].extend({
    payloadNamespace: "vertices",

    maps: {
      succeededTasks: "succeededTasks",
      runningTasks: "runningTasks",
      failedTaskAttempts: "failedTaskAttempts",
      killedTaskAttempts: "killedTaskAttempts",

      initTime: "initTime",
      startTime: "startTime",
      endTime: "finishTime",
      firstTaskStartTime: "firstTaskStartTime",
      lastTaskFinishTime: "lastTaskFinishTime"
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/serializers/vertex', ['exports', 'ember', 'tez-ui/serializers/timeline'], function (exports, _ember, _tezUiSerializersTimeline) {

  function getProcessorClass(source) {
    var name = _ember['default'].get(source, 'otherinfo.processorClassName') || "";
    return name.substr(name.lastIndexOf('.') + 1);
  }

  exports['default'] = _tezUiSerializersTimeline['default'].extend({
    maps: {
      name: 'otherinfo.vertexName',

      _initTime: 'otherinfo.initTime',
      _startTime: 'otherinfo.startTime',
      _endTime: 'otherinfo.endTime',
      _firstTaskStartTime: 'otherinfo.stats.firstTaskStartTime',
      _lastTaskFinishTime: 'otherinfo.stats.lastTaskFinishTime',

      totalTasks: 'otherinfo.numTasks',
      _failedTasks: 'otherinfo.numFailedTasks',
      _succeededTasks: 'otherinfo.numSucceededTasks',
      _killedTasks: 'otherinfo.numKilledTasks',

      _failedTaskAttempts: 'otherinfo.numFailedTaskAttempts',
      _killedTaskAttempts: 'otherinfo.numKilledTaskAttempts',

      minDuration: 'otherinfo.stats.minTaskDuration',
      maxDuration: 'otherinfo.stats.maxTaskDuration',
      avgDuration: 'otherinfo.stats.avgTaskDuration',

      firstTasksToStart: 'otherinfo.stats.firstTasksToStart',
      lastTasksToFinish: 'otherinfo.stats.lastTasksToFinish',
      shortestDurationTasks: 'otherinfo.stats.shortestDurationTasks',
      longestDurationTasks: 'otherinfo.stats.longestDurationTasks',

      processorClassName: getProcessorClass,

      dagID: 'primaryfilters.TEZ_DAG_ID.0'
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/services/env', ['exports', 'ember', 'tez-ui/config/environment'], function (exports, _ember, _tezUiConfigEnvironment) {

  var MoreObject = more.Object;

  exports['default'] = _ember['default'].Service.extend({
    ENV: null,

    init: function init() {
      this.collateConfigs();
    },

    collateConfigs: function collateConfigs() {
      var collatedENV = {
        APP: {}
      },
          ENV = window.ENV;

      MoreObject.merge(collatedENV, _tezUiConfigEnvironment['default']);

      if (ENV) {
        MoreObject.merge(collatedENV.APP, ENV);
      }

      this.setComputedENVs(collatedENV);

      this.set("ENV", collatedENV);
    },

    setComputedENVs: function setComputedENVs(env) {
      var navigator = window.navigator;
      env.isIE = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0;

      if (!env.APP.yarnProtocol) {
        var rmHost = _ember['default'].get(env, "hosts.rm") || "";
        env.APP.yarnProtocol = rmHost.substr(0, rmHost.indexOf("://")) || window.location.protocol.slice(0, -1);
      }
    },

    app: _ember['default'].computed("ENV.APP", function () {
      return this.get("ENV.APP");
    })
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/services/hosts", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Service.extend({

    env: _ember["default"].inject.service("env"),

    correctProtocol: function correctProtocol(url, localProto) {
      var urlProto;

      localProto = localProto || window.location.protocol;

      if (url.match("://")) {
        urlProto = url.substr(0, url.indexOf("//"));
      }

      if (localProto === "file:") {
        urlProto = urlProto || "http:";
      } else {
        urlProto = localProto;
      }

      if (url.match("://")) {
        url = url.substr(url.indexOf("://") + 3);
      }

      return urlProto + "//" + url;
    },

    normalizeURL: function normalizeURL(url) {
      url = this.correctProtocol(url);

      // Remove trailing slash
      if (url && url.charAt(url.length - 1) === '/') {
        url = url.slice(0, -1);
      }
      return url;
    },

    timeline: _ember["default"].computed(function () {
      return this.normalizeURL(this.get("env.app.hosts.timeline"));
    }),

    rm: _ember["default"].computed(function () {
      return this.normalizeURL(this.get("env.app.hosts.rm"));
    }),

    am: _ember["default"].computed(function () {
      var url = this.get("env.app.hosts.rmProxy") || this.get("env.app.hosts.rm");
      return this.normalizeURL(url);
    })

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/services/loader', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Service.extend({

    nameSpace: '',
    store: _ember['default'].inject.service('store'),
    cache: null,

    _setOptions: function _setOptions(options) {
      var nameSpace = options.nameSpace;
      if (nameSpace) {
        // We need to validate only if nameSpace is passed. Else it would be stored in the global space
        _ember['default'].assert('Invalid nameSpace. Please pass a string instead of ' + _ember['default'].inspect(nameSpace), typeof nameSpace === 'string');
        this.set("nameSpace", nameSpace);
      }
    },

    init: function init(options) {
      this._super();
      this._setOptions(options || {});
      this.set("cache", _ember['default'].Object.create());
    },

    checkRequisite: function checkRequisite(type) {
      var store = this.get("store"),
          adapter = store.adapterFor(type),
          serializer = store.serializerFor(type);

      _ember['default'].assert('No loader adapter found for type ' + type + '. Either extend loader and create a custom adapter or extend ApplicationAdapter from loader.', adapter && adapter._isLoader);
      _ember['default'].assert('No loader serializer found for type ' + type + '. Either extend loader and create a custom serializer or extend ApplicationSerializer from loader.', serializer && serializer._isLoader);
    },

    lookup: function lookup(type, name, options) {
      name = _ember['default'].String.dasherize(name);
      return this.get("container").lookup(type + ":" + name, options);
    },

    entityFor: function entityFor(entityName) {
      var entity = this.lookup("entitie", entityName);
      if (!entity) {
        entity = this.lookup("entitie", "entity", { singleton: false });
        entity.set("name", entityName);
      }
      return entity;
    },

    getCacheKey: function getCacheKey(type, query, id) {
      var parts = [type];

      if (id) {
        parts.push(id);
      }
      if (query) {
        parts.push(JSON.stringify(query));
      }

      return parts.join(":").replace(/\./g, ":");
    },

    loadNeed: function loadNeed(record, needName, options, queryParams, urlParams) {
      var entity = this.entityFor(record.get("constructor.modelName"));
      return entity.loadNeed(this, record, needName, options, queryParams, urlParams);
    },

    normalizeOptions: function normalizeOptions(options) {
      options = options || {};

      if (!options.cache) {
        options = _ember['default'].$.extend({}, options);
        options.cache = options.reload ? _ember['default'].Object.create() : this.get("cache");
      }

      return options;
    },

    queryRecord: function queryRecord(type, id, options, query, urlParams) {
      var entity = this.entityFor(type),
          cacheKey = this.getCacheKey(type, query, id),
          record;

      this.checkRequisite(type);

      options = this.normalizeOptions(options);

      record = options.cache.get(cacheKey);
      if (record) {
        return record;
      }

      record = entity.queryRecord(this, id, options, query, urlParams);
      options.cache.set(cacheKey, record);

      return record;
    },
    query: function query(type, _query, options, urlParams) {
      var entity = this.entityFor(type),
          cacheKey = this.getCacheKey(type, _query),
          records;

      this.checkRequisite(type);

      options = this.normalizeOptions(options);

      records = options.cache.get(cacheKey);
      if (records) {
        return records;
      }

      records = entity.query(this, _query, options, urlParams);
      options.cache.set(cacheKey, records);

      return records;
    },

    unloadAll: function unloadAll(type, skipID) {
      var store = this.get("store"),
          loaderNS = this.get("nameSpace");

      store.peekAll(type).forEach(function (record) {
        var id = record.get("id");

        if (id.substr(0, id.indexOf(":")) === loaderNS && record.get("entityID") !== skipID) {
          store.unloadRecord(record);
        }
      });
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/services/local-storage", ["exports", "ember"], function (exports, _ember) {
  exports["default"] = _ember["default"].Service.extend({
    getStoreKey: function getStoreKey(key) {
      return "tez-ui:" + key;
    },
    set: function set(key, value) {
      try {
        localStorage.setItem(this.getStoreKey(key), JSON.stringify(value));
      } catch (e) {
        return e;
      }
      return value;
    },
    get: function get(key) {
      try {
        return JSON.parse(localStorage.getItem(this.getStoreKey(key)));
      } catch (e) {}
      return undefined;
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/services/pollster", ["exports", "ember"], function (exports, _ember) {

  var STATE_STORAGE_KEY = "pollingIsActive",
      DEFAULT_LABEL = "default_label";

  var MoreObject = more.Object;

  exports["default"] = _ember["default"].Service.extend({
    localStorage: _ember["default"].inject.service("localStorage"),
    env: _ember["default"].inject.service("env"),

    interval: _ember["default"].computed.oneWay("env.app.pollingInterval"),

    active: false,
    isPolling: false,
    scheduleID: null,

    polls: {},
    pollCount: 0,

    initState: _ember["default"].on("init", function () {
      var state = this.get("localStorage").get(STATE_STORAGE_KEY);

      if (state === undefined || state === null) {
        state = true;
      }
      _ember["default"].run.later(this, function () {
        this.set("active", state);
      });
    }),
    stateObserver: _ember["default"].observer("active", function () {
      this.get("localStorage").set(STATE_STORAGE_KEY, this.get("active"));
      this.callPoll();
    }),

    isReady: _ember["default"].computed("active", "pollCount", function () {
      return !!(this.get("active") && this.get("pollCount"));
    }),

    callPoll: function callPoll() {
      var that = this;
      this.unSchedulePoll();
      if (this.get("isReady") && !this.get("isPolling")) {
        var pollsPromises = [];

        this.set("isPolling", true);

        MoreObject.forEach(this.get("polls"), function (label, pollDef) {
          pollsPromises.push(pollDef.callback.call(pollDef.context));
        });

        _ember["default"].RSVP.allSettled(pollsPromises)["finally"](function () {
          that.set("isPolling", false);
          that.schedulePoll();
        });
      }
    },

    schedulePoll: function schedulePoll() {
      this.set("scheduleID", setTimeout(this.callPoll.bind(this), this.get("interval")));
    },
    unSchedulePoll: function unSchedulePoll() {
      clearTimeout(this.get("scheduleID"));
    },

    setPoll: function setPoll(pollFunction, context, label) {
      var polls = this.get("polls"),
          pollCount;

      label = label || DEFAULT_LABEL;
      polls[label] = {
        context: context,
        callback: pollFunction
      };
      this.set("pollCount", pollCount = Object.keys(polls).length);

      this.callPoll();
    },
    resetPoll: function resetPoll(label) {
      var polls = this.get("polls"),
          pollCount;

      label = label || DEFAULT_LABEL;
      delete polls[label];
      this.set("pollCount", pollCount = Object.keys(polls).length);

      if (!pollCount) {
        this.unSchedulePoll();
      }
    }
  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define("tez-ui/templates/app", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "tez-ui/templates/app.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 35], [19, 43]]]]], [], []], "autoRefreshEnabled", ["subexpr", "@mut", [["get", "polling.active", ["loc", [null, [19, 63], [19, 77]]]]], [], []]], ["loc", [null, [19, 0], [19, 79]]]], ["content", "outlet", ["loc", [null, [20, 0], [20, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/app/configs", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/configs.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "columns", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "configs", ["loc", [null, [22, 7], [22, 14]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "configs.length", ["loc", [null, [24, 11], [24, 25]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [25, 13], [25, 23]]]]], [], []], "enablePagination", false, "searchAction", "searchChanged", "sortAction", "sortChanged"], ["loc", [null, [20, 2], [31, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/configs.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [33, 2], [33, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/app/configs.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [34, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/app/dags", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/dags.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/dags.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/app/dags.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/app/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 2
              },
              "end": {
                "line": 80,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/app/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("table");
            dom.setAttribute(el1, "class", "detail-list");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("thead");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("th");
            dom.setAttribute(el4, "colspan", "2");
            var el5 = dom.createTextNode("YARN App Details");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tbody");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Status");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Final Status");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Start Time");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("End Time");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Duration");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n\n    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("table");
            dom.setAttribute(el1, "class", "detail-list");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("thead");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("th");
            dom.setAttribute(el4, "colspan", "2");
            var el5 = dom.createTextNode("YARN App Description");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("tbody");
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Application Tracking URL");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createElement("a");
            dom.setAttribute(el5, "target", "_blank");
            var el6 = dom.createComment("");
            dom.appendChild(el5, el6);
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Application Name");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Queue");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("Application Type");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            var el3 = dom.createElement("tr");
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createTextNode("User");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n        ");
            dom.appendChild(el3, el4);
            var el4 = dom.createElement("td");
            var el5 = dom.createComment("");
            dom.appendChild(el4, el5);
            dom.appendChild(el3, el4);
            var el4 = dom.createTextNode("\n      ");
            dom.appendChild(el3, el4);
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1, 3]);
            var element1 = dom.childAt(fragment, [3, 3]);
            var element2 = dom.childAt(element1, [1, 3, 0]);
            var morphs = new Array(11);
            morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
            morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 3]), 0, 0);
            morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 3]), 0, 0);
            morphs[3] = dom.createMorphAt(dom.childAt(element0, [7, 3]), 0, 0);
            morphs[4] = dom.createMorphAt(dom.childAt(element0, [9, 3]), 0, 0);
            morphs[5] = dom.createAttrMorph(element2, 'href');
            morphs[6] = dom.createMorphAt(element2, 0, 0);
            morphs[7] = dom.createMorphAt(dom.childAt(element1, [3, 3]), 0, 0);
            morphs[8] = dom.createMorphAt(dom.childAt(element1, [5, 3]), 0, 0);
            morphs[9] = dom.createMorphAt(dom.childAt(element1, [7, 3]), 0, 0);
            morphs[10] = dom.createMorphAt(dom.childAt(element1, [9, 3]), 0, 0);
            return morphs;
          },
          statements: [["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.app.status", ["loc", [null, [30, 43], [30, 59]]]]], [], []]], ["loc", [null, [30, 12], [30, 61]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.app.finalStatus", ["loc", [null, [34, 43], [34, 64]]]]], [], []]], ["loc", [null, [34, 12], [34, 66]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.app.startTime", ["loc", [null, [38, 37], [38, 56]]]]], [], []]], ["loc", [null, [38, 12], [38, 58]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.app.endTime", ["loc", [null, [42, 37], [42, 54]]]]], [], []]], ["loc", [null, [42, 12], [42, 56]]]], ["inline", "txt", [["get", "model.app.duration", ["loc", [null, [46, 18], [46, 36]]]]], ["type", "duration"], ["loc", [null, [46, 12], [46, 54]]]], ["attribute", "href", ["get", "trackingURL", ["loc", [null, [60, 22], [60, 33]]]]], ["content", "model.app.entityID", ["loc", [null, [60, 52], [60, 74]]]], ["content", "model.app.name", ["loc", [null, [64, 12], [64, 30]]]], ["content", "model.app.queue", ["loc", [null, [68, 12], [68, 31]]]], ["content", "model.app.type", ["loc", [null, [72, 12], [72, 30]]]], ["content", "model.app.user", ["loc", [null, [76, 12], [76, 30]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 125,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Tez Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Entity ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Domain");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("User");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Version Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Build Version");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Build Revision");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Build Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [2, 3]);
          var element4 = dom.childAt(fragment, [4, 3]);
          var morphs = new Array(7);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [1, 3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element3, [3, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element3, [5, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element4, [1, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element4, [3, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element4, [5, 3]), 0, 0);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.app", ["loc", [null, [20, 8], [20, 17]]]]], [], 0, null, ["loc", [null, [20, 2], [80, 9]]]], ["content", "model.entityID", ["loc", [null, [91, 12], [91, 30]]]], ["content", "model.domain", ["loc", [null, [95, 12], [95, 28]]]], ["content", "model.user", ["loc", [null, [99, 12], [99, 26]]]], ["content", "model.tezVersion", ["loc", [null, [113, 12], [113, 32]]]], ["content", "model.tezRevision", ["loc", [null, [117, 12], [117, 33]]]], ["content", "model.buildTime", ["loc", [null, [121, 12], [121, 31]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 125,
              "column": 0
            },
            "end": {
              "line": 127,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/app/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [126, 2], [126, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 128,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/app/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [127, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 8
            },
            "end": {
              "line": 26,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("img");
          dom.setAttribute(el1, "src", "assets/images/logo.png");
          dom.setAttribute(el1, "width", "70px");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 10
            },
            "end": {
              "line": 35,
              "column": 10
            }
          },
          "moduleName": "tez-ui/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("Version ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("b");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
          return morphs;
        },
        statements: [["content", "env.app.buildVersion", ["loc", [null, [34, 29], [34, 53]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 57,
              "column": 8
            },
            "end": {
              "line": 59,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("Timezone ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("b");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 0, 0);
          return morphs;
        },
        statements: [["content", "env.app.timezone", ["loc", [null, [58, 28], [58, 48]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 68,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer-pusher");
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "lr-margin content");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "breadcrumb-container");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("div");
        dom.setAttribute(el5, "class", "ui-info");
        var el6 = dom.createTextNode("\n");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        var el7 = dom.createTextNode("\n            ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("a");
        dom.setAttribute(el7, "target", "_blank");
        var el8 = dom.createTextNode("\n              ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8, "class", "fa fa-question-circle");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n            ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n          ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "lr-margin");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "footer-frame");
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "footer");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "lr-margin content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4, "target", "_blank");
        var el5 = dom.createTextNode("\n        Licensed under the Apache License, Version 2.0.\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "ui-info");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [1, 1]);
        var element3 = dom.childAt(element2, [5]);
        var element4 = dom.childAt(element3, [3, 1]);
        var element5 = dom.childAt(element0, [3, 1]);
        var element6 = dom.childAt(element5, [1]);
        var morphs = new Array(10);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element2, 1, 1);
        morphs[2] = dom.createMorphAt(dom.childAt(element2, [3]), 1, 1);
        morphs[3] = dom.createMorphAt(element3, 1, 1);
        morphs[4] = dom.createAttrMorph(element4, 'href');
        morphs[5] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[6] = dom.createAttrMorph(element6, 'href');
        morphs[7] = dom.createMorphAt(dom.childAt(element5, [3]), 1, 1);
        morphs[8] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[9] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", [["subexpr", "if", [["get", "env.app.isStandalone", ["loc", [null, [19, 17], [19, 37]]]], "standalone", "wrapped"], [], ["loc", [null, [19, 12], [19, 62]]]], " ", ["subexpr", "if", [["get", "env.ENV.isIE", ["loc", [null, [19, 68], [19, 80]]]], "ie"], [], ["loc", [null, [19, 63], [19, 87]]]]]]], ["block", "link-to", ["application"], ["class", "logo"], 0, null, ["loc", [null, [24, 8], [26, 20]]]], ["inline", "em-breadcrumbs", [], ["items", ["subexpr", "@mut", [["get", "prefixedBreadcrumbs", ["loc", [null, [29, 33], [29, 52]]]]], [], []]], ["loc", [null, [29, 10], [29, 54]]]], ["block", "if", [["get", "env.app.buildVersion", ["loc", [null, [33, 16], [33, 36]]]]], [], 1, null, ["loc", [null, [33, 10], [35, 17]]]], ["attribute", "href", ["get", "env.app.hrefs.help", ["loc", [null, [37, 22], [37, 40]]]]], ["content", "outlet", ["loc", [null, [46, 6], [46, 16]]]], ["attribute", "href", ["get", "env.app.hrefs.license", ["loc", [null, [53, 16], [53, 37]]]]], ["block", "if", [["get", "env.app.timezone", ["loc", [null, [57, 14], [57, 30]]]]], [], 2, null, ["loc", [null, [57, 8], [59, 15]]]], ["inline", "outlet", ["modal"], [], ["loc", [null, [65, 0], [65, 18]]]], ["inline", "error-bar", [], ["error", ["subexpr", "@mut", [["get", "appError", ["loc", [null, [67, 18], [67, 26]]]]], [], []]], ["loc", [null, [67, 0], [67, 28]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/attempt", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "tez-ui/templates/attempt.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 35], [19, 43]]]]], [], []], "autoRefreshEnabled", ["subexpr", "@mut", [["get", "polling.active", ["loc", [null, [19, 63], [19, 77]]]]], [], []]], ["loc", [null, [19, 0], [19, 79]]]], ["content", "outlet", ["loc", [null, [20, 0], [20, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/attempt/counters", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/attempt/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "columns", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "counters", ["loc", [null, [22, 7], [22, 15]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "countersCount", ["loc", [null, [24, 11], [24, 24]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [25, 13], [25, 23]]]]], [], []], "enablePagination", false, "searchAction", "searchChanged", "sortAction", "sortChanged"], ["loc", [null, [20, 2], [31, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/attempt/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [33, 2], [33, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/attempt/counters.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [34, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/attempt/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 66,
                "column": 10
              },
              "end": {
                "line": 74,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/attempt/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "target", "_blank");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-file-o");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" View\n            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n             \n            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("a");
            dom.setAttribute(el1, "target", "_blank");
            dom.setAttribute(el1, "download", "");
            var el2 = dom.createTextNode("\n              ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("i");
            dom.setAttribute(el2, "class", "fa fa-download");
            dom.setAttribute(el2, "aria-hidden", "true");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode(" Download\n            ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var element1 = dom.childAt(fragment, [3]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element0, 'href');
            morphs[1] = dom.createAttrMorph(element1, 'href');
            return morphs;
          },
          statements: [["attribute", "href", ["get", "model.logURL", ["loc", [null, [67, 22], [67, 34]]]]], ["attribute", "href", ["get", "model.logURL", ["loc", [null, [71, 22], [71, 34]]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 74,
                "column": 10
              },
              "end": {
                "line": 76,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/attempt/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("              ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("span");
            dom.setAttribute(el1, "class", "txt-message");
            var el2 = dom.createTextNode("Not Available!");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 82,
                "column": 2
              },
              "end": {
                "line": 91,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/attempt/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "panel panel-danger");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "panel-heading");
            var el3 = dom.createTextNode("\n        Diagnostics\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "diagnostics");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.diagnostics", ["loc", [null, [88, 8], [88, 31]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 93,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/attempt/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Task Attempt ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Task ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Container ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Node ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Status");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Progress");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Start Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("End Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Log");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element2 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(11);
          morphs[0] = dom.createMorphAt(dom.childAt(element2, [1, 3]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element2, [3, 3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element2, [5, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element2, [7, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element2, [9, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element2, [11, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element2, [13, 3]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element2, [15, 3]), 0, 0);
          morphs[8] = dom.createMorphAt(dom.childAt(element2, [17, 3]), 0, 0);
          morphs[9] = dom.createMorphAt(dom.childAt(element2, [19, 3]), 1, 1);
          morphs[10] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["content", "model.entityID", ["loc", [null, [29, 12], [29, 30]]]], ["content", "model.taskID", ["loc", [null, [33, 12], [33, 28]]]], ["inline", "txt", [["get", "model.containerID", ["loc", [null, [37, 18], [37, 35]]]]], [], ["loc", [null, [37, 12], [37, 37]]]], ["inline", "txt", [["get", "model.nodeID", ["loc", [null, [41, 18], [41, 30]]]]], [], ["loc", [null, [41, 12], [41, 32]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.status", ["loc", [null, [45, 43], [45, 55]]]]], [], []]], ["loc", [null, [45, 12], [45, 57]]]], ["inline", "em-table-progress-cell", [], ["content", ["subexpr", "@mut", [["get", "model.progress", ["loc", [null, [49, 45], [49, 59]]]]], [], []]], ["loc", [null, [49, 12], [49, 61]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.startTime", ["loc", [null, [53, 37], [53, 52]]]]], [], []]], ["loc", [null, [53, 12], [53, 54]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.endTime", ["loc", [null, [57, 37], [57, 50]]]]], [], []]], ["loc", [null, [57, 12], [57, 52]]]], ["inline", "txt", [["get", "model.duration", ["loc", [null, [61, 18], [61, 32]]]]], ["type", "duration"], ["loc", [null, [61, 12], [61, 50]]]], ["block", "if", [["get", "model.logURL", ["loc", [null, [66, 16], [66, 28]]]]], [], 0, 1, ["loc", [null, [66, 10], [76, 17]]]], ["block", "if", [["get", "model.diagnostics", ["loc", [null, [82, 8], [82, 25]]]]], [], 2, null, ["loc", [null, [82, 2], [91, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 93,
              "column": 0
            },
            "end": {
              "line": 95,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/attempt/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [94, 2], [94, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 96,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/attempt/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [95, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/bs-accordion-item", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-accordion-item.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "panel-body");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [10, 8], [10, 17]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 16
          }
        },
        "moduleName": "tez-ui/templates/components/bs-accordion-item.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "role", "tab");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h4");
        dom.setAttribute(el2, "class", "panel-title");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createElementMorph(element0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["panel-heading ", ["subexpr", "if", [["get", "collapsed", ["loc", [null, [1, 68], [1, 77]]]], "collapsed"], [], ["loc", [null, [1, 63], [1, 91]]]]]]], ["element", "action", ["toggleActive"], [], ["loc", [null, [1, 16], [1, 41]]]], ["content", "title", ["loc", [null, [4, 12], [4, 21]]]], ["block", "bs-collapse", [], ["collapsed", ["subexpr", "@mut", [["get", "collapsed", ["loc", [null, [8, 25], [8, 34]]]]], [], []], "class", "panel-collapse"], 0, null, ["loc", [null, [8, 0], [12, 16]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/bs-alert", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 2,
                "column": 0
              },
              "end": {
                "line": 4,
                "column": 0
              }
            },
            "moduleName": "tez-ui/templates/components/bs-alert.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("button");
            dom.setAttribute(el1, "type", "button");
            dom.setAttribute(el1, "class", "close");
            dom.setAttribute(el1, "aria-label", "Close");
            var el2 = dom.createElement("span");
            dom.setAttribute(el2, "aria-hidden", "true");
            var el3 = dom.createTextNode("×");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(1);
            morphs[0] = dom.createElementMorph(element0);
            return morphs;
          },
          statements: [["element", "action", ["dismiss"], [], ["loc", [null, [3, 59], [3, 79]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-alert.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          dom.insertBoundary(fragment, 0);
          return morphs;
        },
        statements: [["block", "if", [["get", "dismissible", ["loc", [null, [2, 6], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]], ["content", "yield", ["loc", [null, [5, 0], [5, 9]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 7,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/bs-alert.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "unless", [["get", "dismissed", ["loc", [null, [1, 10], [1, 19]]]]], [], 0, null, ["loc", [null, [1, 0], [6, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/bs-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 37
            }
          },
          "moduleName": "tez-ui/templates/components/bs-button.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("i");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [0]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "icon", ["loc", [null, [1, 24], [1, 28]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 61
          }
        },
        "moduleName": "tez-ui/templates/components/bs-button.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "icon", ["loc", [null, [1, 6], [1, 10]]]]], [], 0, null, ["loc", [null, [1, 0], [1, 44]]]], ["content", "text", ["loc", [null, [1, 44], [1, 52]]]], ["content", "yield", ["loc", [null, [1, 52], [1, 61]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/bs-form-group", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 0
            },
            "end": {
              "line": 4,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-form-group.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "aria-hidden", "true");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["form-control-feedback ", ["get", "iconName", ["loc", [null, [3, 41], [3, 49]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 4,
            "column": 7
          }
        },
        "moduleName": "tez-ui/templates/components/bs-form-group.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]], ["block", "if", [["get", "hasFeedback", ["loc", [null, [2, 6], [2, 17]]]]], [], 0, null, ["loc", [null, [2, 0], [4, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/bs-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 9
          }
        },
        "moduleName": "tez-ui/templates/components/bs-form.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "yield", ["loc", [null, [1, 0], [1, 9]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/bs-modal-dialog", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 8
            },
            "end": {
              "line": 5,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "bs-modal-header", [], ["title", ["subexpr", "@mut", [["get", "title", ["loc", [null, [4, 36], [4, 41]]]]], [], []], "closeButton", ["subexpr", "@mut", [["get", "closeButton", ["loc", [null, [4, 54], [4, 65]]]]], [], []]], ["loc", [null, [4, 12], [4, 67]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 12
              },
              "end": {
                "line": 9,
                "column": 12
              }
            },
            "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("                ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [8, 16], [8, 25]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 10,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "bs-modal-body", [], [], 0, null, ["loc", [null, [7, 12], [9, 30]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 8
            },
            "end": {
              "line": 12,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "yield", ["loc", [null, [11, 12], [11, 21]]]]],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 8
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("            ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["content", "bs-modal-footer", ["loc", [null, [15, 12], [15, 31]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/bs-modal-dialog.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-content");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 2, 2);
        morphs[3] = dom.createMorphAt(element1, 4, 4);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["modal-dialog ", ["get", "sizeClass", ["loc", [null, [1, 27], [1, 36]]]]]]], ["block", "if", [["get", "header", ["loc", [null, [3, 14], [3, 20]]]]], [], 0, null, ["loc", [null, [3, 8], [5, 15]]]], ["block", "if", [["get", "body", ["loc", [null, [6, 14], [6, 18]]]]], [], 1, 2, ["loc", [null, [6, 8], [12, 15]]]], ["block", "if", [["get", "footer", ["loc", [null, [14, 14], [14, 20]]]]], [], 3, null, ["loc", [null, [14, 8], [16, 15]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("tez-ui/templates/components/bs-modal-footer", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [2, 12], [2, 16]]]]], [], ["loc", [null, [2, 4], [2, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 5,
                  "column": 8
                },
                "end": {
                  "line": 5,
                  "column": 66
                }
              },
              "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "closeTitle", ["loc", [null, [5, 52], [5, 66]]]]],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 6,
                  "column": 8
                },
                "end": {
                  "line": 6,
                  "column": 96
                }
              },
              "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "submitTitle", ["loc", [null, [6, 81], [6, 96]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 4,
                "column": 4
              },
              "end": {
                "line": 7,
                "column": 4
              }
            },
            "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["block", "bs-button", [], ["type", "default", "action", "close"], 0, null, ["loc", [null, [5, 8], [5, 80]]]], ["block", "bs-button", [], ["type", "primary", "buttonType", "submit", "disabled", ["subexpr", "@mut", [["get", "submitDisabled", ["loc", [null, [6, 65], [6, 79]]]]], [], []]], 1, null, ["loc", [null, [6, 8], [6, 110]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 8,
                  "column": 8
                },
                "end": {
                  "line": 8,
                  "column": 66
                }
              },
              "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
              dom.insertBoundary(fragment, 0);
              dom.insertBoundary(fragment, null);
              return morphs;
            },
            statements: [["content", "closeTitle", ["loc", [null, [8, 52], [8, 66]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 4
              },
              "end": {
                "line": 9,
                "column": 4
              }
            },
            "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["block", "bs-button", [], ["type", "primary", "action", "close"], 0, null, ["loc", [null, [8, 8], [8, 80]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 0
            },
            "end": {
              "line": 10,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "hasSubmitButton", ["loc", [null, [4, 10], [4, 25]]]]], [], 0, 1, ["loc", [null, [4, 4], [9, 11]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 7
          }
        },
        "moduleName": "tez-ui/templates/components/bs-modal-footer.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasBlock", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [10, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/bs-modal-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "modifiers",
            "modifiers": ["action"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "close");
          dom.setAttribute(el1, "aria-label", "Close");
          var el2 = dom.createElement("span");
          dom.setAttribute(el2, "aria-hidden", "true");
          var el3 = dom.createTextNode("×");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["close"], [], ["loc", [null, [2, 59], [2, 77]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 0
            },
            "end": {
              "line": 6,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "yield", [["get", "this", ["loc", [null, [5, 12], [5, 16]]]]], [], ["loc", [null, [5, 4], [5, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal-header.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          dom.setAttribute(el1, "class", "modal-title");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "title", ["loc", [null, [7, 28], [7, 37]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/bs-modal-header.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "closeButton", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["block", "if", [["get", "hasBlock", ["loc", [null, [4, 6], [4, 14]]]]], [], 1, 2, ["loc", [null, [4, 0], [8, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/components/bs-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 3,
                "column": 0
              },
              "end": {
                "line": 5,
                "column": 0
              }
            },
            "moduleName": "tez-ui/templates/components/bs-modal.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "yield", ["loc", [null, [4, 2], [4, 11]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 7,
                "column": 0
              },
              "end": {
                "line": 9,
                "column": 0
              }
            },
            "moduleName": "tez-ui/templates/components/bs-modal.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("  ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(2);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createAttrMorph(element0, 'id');
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["modal-backdrop ", ["subexpr", "if", [["get", "fade", ["loc", [null, [8, 34], [8, 38]]]], "fade"], [], ["loc", [null, [8, 29], [8, 47]]]], " ", ["subexpr", "if", [["get", "in", ["loc", [null, [8, 53], [8, 55]]]], "in"], [], ["loc", [null, [8, 48], [8, 62]]]]]]], ["attribute", "id", ["concat", [["get", "backdropId", ["loc", [null, [8, 70], [8, 80]]]]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["wrong-type", "multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 11,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["block", "bs-modal-dialog", [], ["close", ["subexpr", "action", ["close"], [], ["loc", [null, [3, 25], [3, 41]]]], "fade", ["subexpr", "@mut", [["get", "fade", ["loc", [null, [3, 47], [3, 51]]]]], [], []], "in", ["subexpr", "@mut", [["get", "in", ["loc", [null, [3, 55], [3, 57]]]]], [], []], "id", ["subexpr", "@mut", [["get", "modalId", ["loc", [null, [3, 61], [3, 68]]]]], [], []], "title", ["subexpr", "@mut", [["get", "title", ["loc", [null, [3, 75], [3, 80]]]]], [], []], "closeButton", ["subexpr", "@mut", [["get", "closeButton", ["loc", [null, [3, 93], [3, 104]]]]], [], []], "keyboard", ["subexpr", "@mut", [["get", "keyboard", ["loc", [null, [3, 114], [3, 122]]]]], [], []], "header", ["subexpr", "@mut", [["get", "header", ["loc", [null, [3, 130], [3, 136]]]]], [], []], "body", ["subexpr", "@mut", [["get", "body", ["loc", [null, [3, 142], [3, 146]]]]], [], []], "footer", ["subexpr", "@mut", [["get", "footer", ["loc", [null, [3, 154], [3, 160]]]]], [], []], "size", ["subexpr", "@mut", [["get", "size", ["loc", [null, [3, 166], [3, 170]]]]], [], []], "backdropClose", ["subexpr", "@mut", [["get", "backdropClose", ["loc", [null, [3, 185], [3, 198]]]]], [], []]], 0, null, ["loc", [null, [3, 0], [5, 20]]]], ["block", "if", [["get", "showBackdrop", ["loc", [null, [7, 6], [7, 18]]]]], [], 1, null, ["loc", [null, [7, 0], [9, 7]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 11,
            "column": 19
          }
        },
        "moduleName": "tez-ui/templates/components/bs-modal.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "ember-wormhole", [], ["to", "ember-bootstrap-modal-container"], 0, null, ["loc", [null, [1, 0], [11, 19]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/bs-select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 5,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          dom.setAttribute(el1, "disabled", "");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element1, 'selected');
          morphs[1] = dom.createMorphAt(element1, 1, 1);
          return morphs;
        },
        statements: [["attribute", "selected", ["subexpr", "is-not", [["get", "value", ["loc", [null, [2, 39], [2, 44]]]]], [], ["loc", [null, [2, 30], [2, 46]]]]], ["content", "prompt", ["loc", [null, [3, 8], [3, 18]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 7,
              "column": 0
            },
            "end": {
              "line": 12,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/bs-select.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'selected');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "value", ["concat", [["subexpr", "read-path", [["get", "item", ["loc", [null, [8, 31], [8, 35]]]], ["get", "optionValuePath", ["loc", [null, [8, 36], [8, 51]]]]], [], ["loc", [null, [8, 19], [8, 53]]]]]]], ["attribute", "selected", ["subexpr", "is-equal", [["get", "item", ["loc", [null, [9, 32], [9, 36]]]], ["get", "value", ["loc", [null, [9, 37], [9, 42]]]]], [], ["loc", [null, [9, 21], [9, 44]]]]], ["inline", "read-path", [["get", "item", ["loc", [null, [10, 20], [10, 24]]]], ["get", "optionLabelPath", ["loc", [null, [10, 25], [10, 40]]]]], [], ["loc", [null, [10, 8], [10, 42]]]]],
        locals: ["item"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 9
          }
        },
        "moduleName": "tez-ui/templates/components/bs-select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "prompt", ["loc", [null, [1, 6], [1, 12]]]]], [], 0, null, ["loc", [null, [1, 0], [5, 7]]]], ["block", "each", [["get", "content", ["loc", [null, [7, 8], [7, 15]]]]], ["key", "@identity"], 1, null, ["loc", [null, [7, 0], [12, 9]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/caller-info", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 25,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/caller-info.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "panel panel-info");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "panel-heading");
        var el3 = dom.createTextNode("\n    Additional Info from ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("textarea");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
        return morphs;
      },
      statements: [["content", "type", ["loc", [null, [21, 25], [21, 33]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/column-selector", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 33,
                "column": 6
              },
              "end": {
                "line": 38,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/column-selector.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var element0 = dom.childAt(fragment, [1]);
            var morphs = new Array(3);
            morphs[0] = dom.createAttrMorph(element0, 'class');
            morphs[1] = dom.createMorphAt(element0, 1, 1);
            morphs[2] = dom.createMorphAt(element0, 3, 3);
            return morphs;
          },
          statements: [["attribute", "class", ["concat", ["select-option ", ["get", "option.css", ["loc", [null, [34, 36], [34, 46]]]]]]], ["inline", "input", [], ["type", "checkbox", "classNames", "checkbox", "checked", ["subexpr", "@mut", [["get", "option.selected", ["loc", [null, [35, 64], [35, 79]]]]], [], []]], ["loc", [null, [35, 10], [35, 81]]]], ["content", "option.displayText", ["loc", [null, [36, 10], [36, 32]]]]],
          locals: ["option"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 4
            },
            "end": {
              "line": 39,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/column-selector.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "each", [["get", "filteredOptions", ["loc", [null, [33, 14], [33, 29]]]]], [], 0, null, ["loc", [null, [33, 6], [38, 15]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 39,
              "column": 4
            },
            "end": {
              "line": 41,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/column-selector.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("h4");
          var el2 = dom.createTextNode(" No options available...");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 50,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/column-selector.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "selection-list");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "filter-option highlight");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "form-group");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "select-all");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("input");
        dom.setAttribute(el4, "type", "checkbox");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n       Select All\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "options");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "form-actions");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "message");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        dom.setAttribute(el2, "class", "btn btn-primary");
        dom.setAttribute(el2, "data-dismiss", "modal");
        dom.setAttribute(el2, "aria-label", "Close");
        var el3 = dom.createTextNode("Ok");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("button");
        dom.setAttribute(el2, "type", "button");
        dom.setAttribute(el2, "class", "btn");
        dom.setAttribute(el2, "data-dismiss", "modal");
        dom.setAttribute(el2, "aria-label", "Close");
        var el3 = dom.createTextNode("Cancel");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [3, 1]);
        if (this.cachedFragment) {
          dom.repairClonedNode(element3, [], true);
        }
        var element4 = dom.childAt(fragment, [3]);
        var element5 = dom.childAt(element4, [3]);
        var morphs = new Array(6);
        morphs[0] = dom.createMorphAt(dom.childAt(element2, [1]), 1, 1);
        morphs[1] = dom.createAttrMorph(element3, 'checked');
        morphs[2] = dom.createAttrMorph(element3, 'onclick');
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [3]), 1, 1);
        morphs[4] = dom.createUnsafeMorphAt(dom.childAt(element4, [1]), 1, 1);
        morphs[5] = dom.createElementMorph(element5);
        return morphs;
      },
      statements: [["inline", "input", [], ["class", "form-control", "placeholder", "Filter...", "value", ["subexpr", "@mut", [["get", "searchText", ["loc", [null, [22, 65], [22, 75]]]]], [], []]], ["loc", [null, [22, 6], [22, 77]]]], ["attribute", "checked", ["get", "selectAll", ["loc", [null, [26, 23], [26, 32]]]]], ["attribute", "onclick", ["subexpr", "action", ["selectAll"], ["value", "target.checked"], ["loc", [null, [27, 21], [27, 66]]]]], ["block", "if", [["get", "filteredOptions.length", ["loc", [null, [32, 10], [32, 32]]]]], [], 0, 1, ["loc", [null, [32, 4], [41, 11]]]], ["content", "content.message", ["loc", [null, [46, 4], [46, 25]]]], ["element", "action", ["ok"], [], ["loc", [null, [48, 48], [48, 63]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/dags-page-search", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 78,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/dags-page-search.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "form-group");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element dag-name");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("DAG Name:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("ID:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("Submitter:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("Status:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("select");
        dom.setAttribute(el3, "class", "form-control input-sm");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "");
        var el5 = dom.createTextNode("All");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "SUBMITTED");
        var el5 = dom.createTextNode("Submitted");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "RUNNING");
        var el5 = dom.createTextNode("Running");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "SUCCEEDED");
        var el5 = dom.createTextNode("Succeeded");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "FAILED");
        var el5 = dom.createTextNode("Failed");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("option");
        dom.setAttribute(el4, "value", "ERROR");
        var el5 = dom.createTextNode("Error");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("Application ID:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "search-element");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        dom.setAttribute(el3, "for", "pwd");
        var el4 = dom.createTextNode("Caller ID:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        dom.setAttribute(el1, "type", "button");
        dom.setAttribute(el1, "class", "btn btn-success");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "fa fa-search");
        dom.setAttribute(el2, "aria-hidden", "true");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [4, 3]);
        var element2 = dom.childAt(fragment, [3]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 3, 3);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [2]), 3, 3);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [3]), 3, 3);
        morphs[3] = dom.createAttrMorph(element1, 'value');
        morphs[4] = dom.createAttrMorph(element1, 'onchange');
        morphs[5] = dom.createElementMorph(element1);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [5]), 3, 3);
        morphs[7] = dom.createMorphAt(dom.childAt(element0, [6]), 3, 3);
        morphs[8] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "dagName", ["loc", [null, [22, 18], [22, 25]]]]], [], []], "type", "text", "class", "form-control input-sm", "placeholder", "Search...", "enter", "search"], ["loc", [null, [22, 4], [27, 6]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "dagID", ["loc", [null, [30, 18], [30, 23]]]]], [], []], "type", "text", "class", "form-control input-sm", "placeholder", "Search...", "enter", "search"], ["loc", [null, [30, 4], [35, 6]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "submitter", ["loc", [null, [38, 18], [38, 27]]]]], [], []], "type", "text", "class", "form-control input-sm", "placeholder", "Search...", "enter", "search"], ["loc", [null, [38, 4], [43, 6]]]], ["attribute", "value", ["get", "status", ["loc", [null, [46, 20], [46, 26]]]]], ["attribute", "onchange", ["subexpr", "action", ["statusChanged"], ["value", "target.value"], ["loc", [null, [48, 17], [48, 64]]]]], ["element", "action", ["statusKeyPress"], ["on", "keyPress"], ["loc", [null, [49, 8], [49, 49]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "appID", ["loc", [null, [59, 18], [59, 23]]]]], [], []], "type", "text", "class", "form-control input-sm", "placeholder", "Search...", "enter", "search"], ["loc", [null, [59, 4], [64, 6]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "callerID", ["loc", [null, [67, 18], [67, 26]]]]], [], []], "type", "text", "class", "form-control input-sm", "placeholder", "Search...", "enter", "search"], ["loc", [null, [67, 4], [72, 6]]]], ["element", "action", ["search"], [], ["loc", [null, [75, 46], [75, 65]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/dags-pagination-ui", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 4
            },
            "end": {
              "line": 23,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      First\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 4
            },
            "end": {
              "line": 25,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      No Records!\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 30,
                  "column": 8
                },
                "end": {
                  "line": 32,
                  "column": 8
                }
              },
              "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("i");
              dom.setAttribute(el1, "class", "fa fa-spinner fa-spin");
              dom.setAttribute(el1, "aria-hidden", "true");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes() {
              return [];
            },
            statements: [],
            locals: [],
            templates: []
          };
        })();
        var child1 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 32,
                  "column": 8
                },
                "end": {
                  "line": 34,
                  "column": 8
                }
              },
              "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
            },
            isEmpty: false,
            arity: 0,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("          ");
              dom.appendChild(el0, el1);
              var el1 = dom.createComment("");
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var morphs = new Array(1);
              morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
              return morphs;
            },
            statements: [["content", "page.pageNum", ["loc", [null, [33, 10], [33, 26]]]]],
            locals: [],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 6
              },
              "end": {
                "line": 35,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "if", [["get", "tableDefinition.loadingMore", ["loc", [null, [30, 14], [30, 41]]]]], [], 0, 1, ["loc", [null, [30, 8], [34, 15]]]]],
          locals: [],
          templates: [child0, child1]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 6
              },
              "end": {
                "line": 37,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "page.pageNum", ["loc", [null, [36, 8], [36, 24]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 2
            },
            "end": {
              "line": 39,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createElementMorph(element1);
          morphs[2] = dom.createMorphAt(element1, 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "if", [["get", "page.isCurrent", ["loc", [null, [28, 20], [28, 34]]]], "is-current", "clickable"], [], ["loc", [null, [28, 15], [28, 61]]]]]]], ["element", "action", ["changePage", ["get", "page.pageNum", ["loc", [null, [28, 85], [28, 97]]]]], [], ["loc", [null, [28, 63], [28, 99]]]], ["block", "if", [["get", "page.isLoadPage", ["loc", [null, [29, 12], [29, 27]]]]], [], 0, 1, ["loc", [null, [29, 6], [37, 13]]]]],
        locals: ["page"],
        templates: [child0, child1]
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 44,
              "column": 4
            },
            "end": {
              "line": 48,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("option");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" Rows\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(3);
          morphs[0] = dom.createAttrMorph(element0, 'value');
          morphs[1] = dom.createAttrMorph(element0, 'selected');
          morphs[2] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "value", ["get", "option.value", ["loc", [null, [45, 22], [45, 34]]]]], ["attribute", "selected", ["get", "option.selected", ["loc", [null, [45, 48], [45, 63]]]]], ["content", "option.value", ["loc", [null, [46, 8], [46, 24]]]]],
        locals: ["option"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 51,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/dags-pagination-ui.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "page-list");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row-select");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("select");
        dom.setAttribute(el2, "title", "Select rows to display");
        dom.setAttribute(el2, "class", "form-control");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [1]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(fragment, [3, 1]);
        var morphs = new Array(6);
        morphs[0] = dom.createAttrMorph(element3, 'class');
        morphs[1] = dom.createElementMorph(element3);
        morphs[2] = dom.createMorphAt(element3, 1, 1);
        morphs[3] = dom.createMorphAt(element2, 3, 3);
        morphs[4] = dom.createAttrMorph(element4, 'onchange');
        morphs[5] = dom.createMorphAt(element4, 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", [["subexpr", "unless", [["get", "atFirst", ["loc", [null, [20, 22], [20, 29]]]], "clickable"], [], ["loc", [null, [20, 13], [20, 43]]]]]]], ["element", "action", ["changePage", 1], [], ["loc", [null, [20, 45], [20, 70]]]], ["block", "if", [["get", "dataProcessor.processedRows.length", ["loc", [null, [21, 10], [21, 44]]]]], [], 0, 1, ["loc", [null, [21, 4], [25, 11]]]], ["block", "each", [["get", "_possiblePages", ["loc", [null, [27, 10], [27, 24]]]]], [], 2, null, ["loc", [null, [27, 2], [39, 11]]]], ["attribute", "onchange", ["subexpr", "action", ["rowSelected"], ["value", "target.value"], ["loc", [null, [43, 71], [43, 116]]]]], ["block", "each", [["get", "rowCountOptions", ["loc", [null, [44, 12], [44, 27]]]]], [], 3, null, ["loc", [null, [44, 4], [48, 13]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("tez-ui/templates/components/date-formatter", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 45
          }
        },
        "moduleName": "tez-ui/templates/components/date-formatter.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "txt", [["get", "content", ["loc", [null, [19, 6], [19, 13]]]]], ["type", "date", "timeZone", ["subexpr", "@mut", [["get", "timeZone", ["loc", [null, [19, 35], [19, 43]]]]], [], []]], ["loc", [null, [19, 0], [19, 45]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-blocking-event", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-blocking-event.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-consolidated-process", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["empty-body"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-consolidated-process.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n ");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-event-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 29
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-event-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-bar");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-event", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 32
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-event.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "event-bubble");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-process-line", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-process-line.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "process-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-process-name", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 16
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-process-name.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "process.name", ["loc", [null, [19, 0], [19, 16]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-process-visual", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 0
            },
            "end": {
              "line": 36,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane-process-visual.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-swimlane-blocking-event", [], ["process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [29, 12], [29, 19]]]]], [], []], "blocking", ["subexpr", "@mut", [["get", "blocking", ["loc", [null, [30, 13], [30, 21]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [31, 14], [31, 23]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [28, 2], [35, 4]]]]],
        locals: ["blocking"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 0
            },
            "end": {
              "line": 47,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane-process-visual.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-swimlane-event-bar", [], ["bar", ["subexpr", "@mut", [["get", "bar", ["loc", [null, [39, 8], [39, 11]]]]], [], []], "barIndex", ["subexpr", "@mut", [["get", "index", ["loc", [null, [40, 13], [40, 18]]]]], [], []], "process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [41, 12], [41, 19]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [42, 14], [42, 23]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [38, 2], [46, 4]]]]],
        locals: ["bar", "index"],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 48,
              "column": 0
            },
            "end": {
              "line": 57,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane-process-visual.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-swimlane-event", [], ["process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [50, 12], [50, 19]]]]], [], []], "event", ["subexpr", "@mut", [["get", "event", ["loc", [null, [51, 10], [51, 15]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [52, 14], [52, 23]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [49, 2], [56, 4]]]]],
        locals: ["event"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 58,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-process-visual.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "base-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 6, 6, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 7, 7, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "em-swimlane-process-line", [], ["process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [22, 12], [22, 21]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [20, 0], [26, 2]]]], ["block", "each", [["get", "process.blocking", ["loc", [null, [27, 8], [27, 24]]]]], ["key", "_id"], 0, null, ["loc", [null, [27, 0], [36, 9]]]], ["block", "each", [["get", "process.eventBars", ["loc", [null, [37, 8], [37, 25]]]]], [], 1, null, ["loc", [null, [37, 0], [47, 9]]]], ["block", "each", [["get", "process.events", ["loc", [null, [48, 8], [48, 22]]]]], ["key", "name"], 2, null, ["loc", [null, [48, 0], [57, 9]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-ruler", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane-ruler.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "ruler-mark");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("ul");
          dom.setAttribute(el2, "class", "sub-marks");
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("li");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n       ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'style');
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "style", ["get", "markDef.style", ["loc", [null, [22, 36], [22, 49]]]]], ["content", "mark.duration", ["loc", [null, [24, 12], [24, 29]]]]],
        locals: ["mark"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 31,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-ruler.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "ruler-line");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "mark-container");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "unit-text");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [5]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
        morphs[1] = dom.createAttrMorph(element1, 'style');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "marks", ["loc", [null, [21, 10], [21, 15]]]]], [], 0, null, ["loc", [null, [21, 2], [26, 11]]]], ["attribute", "style", ["get", "unitTextStyle", ["loc", [null, [28, 31], [28, 44]]]]], ["content", "markDef.unit", ["loc", [null, [29, 2], [29, 18]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/em-swimlane-vertex-name", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 23,
            "column": 16
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane-vertex-name.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        dom.setAttribute(el1, "class", "progress-text");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "progressText", ["loc", [null, [20, 2], [20, 18]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "process.vertex.finalStatus", ["loc", [null, [22, 31], [22, 57]]]]], [], []]], ["loc", [null, [22, 0], [22, 59]]]], ["content", "process.name", ["loc", [null, [23, 0], [23, 16]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/em-swimlane", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 27,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "component", [["get", "nameComponent", ["loc", [null, [21, 16], [21, 29]]]]], ["process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [22, 14], [22, 21]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [21, 4], [26, 6]]]]],
        locals: ["process"],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 4
            },
            "end": {
              "line": 41,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "component", [["get", "visualComponent", ["loc", [null, [34, 18], [34, 33]]]]], ["process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [35, 16], [35, 23]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [36, 18], [36, 27]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [34, 6], [40, 8]]]]],
        locals: ["process"],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 45,
                "column": 8
              },
              "end": {
                "line": 54,
                "column": 8
              }
            },
            "moduleName": "tez-ui/templates/components/em-swimlane.hbs"
          },
          isEmpty: false,
          arity: 1,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("          ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "em-swimlane-consolidated-process", [], ["focusedProcess", ["subexpr", "@mut", [["get", "focusedProcess", ["loc", [null, [47, 27], [47, 41]]]]], [], []], "process", ["subexpr", "@mut", [["get", "process", ["loc", [null, [48, 20], [48, 27]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [49, 22], [49, 31]]]]], [], []], "showTooltip", "showTooltip", "hideTooltip", "hideTooltip", "click", "click"], ["loc", [null, [46, 10], [53, 12]]]]],
          locals: ["process"],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 43,
              "column": 4
            },
            "end": {
              "line": 56,
              "column": 4
            }
          },
          "moduleName": "tez-ui/templates/components/em-swimlane.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("      ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "consolidated-view");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
          return morphs;
        },
        statements: [["block", "each", [["get", "normalizedProcesses", ["loc", [null, [45, 16], [45, 35]]]]], ["key", "_id"], 0, null, ["loc", [null, [45, 8], [54, 17]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 63,
            "column": 39
          }
        },
        "moduleName": "tez-ui/templates/components/em-swimlane.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "process-names");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "consolidated-view-label");
        var el3 = dom.createTextNode("\n    Consolidated\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "process-visuals");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "zoom-panel");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(element0, 1, 1);
        morphs[2] = dom.createMorphAt(element0, 3, 3);
        morphs[3] = dom.createMorphAt(element0, 5, 5);
        morphs[4] = dom.createMorphAt(fragment, 4, 4, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "normalizedProcesses", ["loc", [null, [20, 10], [20, 29]]]]], ["key", "_id"], 0, null, ["loc", [null, [20, 2], [27, 11]]]], ["block", "each", [["get", "normalizedProcesses", ["loc", [null, [33, 12], [33, 31]]]]], ["key", "_id"], 1, null, ["loc", [null, [33, 4], [41, 13]]]], ["block", "if", [["get", "consolidate", ["loc", [null, [43, 10], [43, 21]]]]], [], 2, null, ["loc", [null, [43, 4], [56, 11]]]], ["inline", "em-swimlane-ruler", [], ["scroll", ["subexpr", "@mut", [["get", "scroll", ["loc", [null, [58, 31], [58, 37]]]]], [], []], "processor", ["subexpr", "@mut", [["get", "processor", ["loc", [null, [58, 48], [58, 57]]]]], [], []], "zoom", ["subexpr", "@mut", [["get", "zoom", ["loc", [null, [58, 63], [58, 67]]]]], [], []]], ["loc", [null, [58, 4], [58, 69]]]], ["inline", "em-tooltip", [], ["contents", ["subexpr", "@mut", [["get", "tooltipContents", ["loc", [null, [63, 22], [63, 37]]]]], [], []]], ["loc", [null, [63, 0], [63, 39]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/components/em-table-status-cell", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 24,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-table-status-cell.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("i");
          dom.setAttribute(el2, "class", "status-icon");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["status ", ["get", "statusName", ["loc", [null, [20, 24], [20, 34]]]]]]], ["content", "content", ["loc", [null, [22, 4], [22, 15]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 24,
              "column": 0
            },
            "end": {
              "line": 26,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-table-status-cell.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "txt-message");
          var el2 = dom.createTextNode(" Not Available! ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 27,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-table-status-cell.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "content", ["loc", [null, [19, 6], [19, 13]]]]], [], 0, 1, ["loc", [null, [19, 0], [26, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/em-tooltip", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 23,
                "column": 6
              },
              "end": {
                "line": 25,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "tip-title");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2]), 0, 0);
            dom.insertBoundary(fragment, 0);
            return morphs;
          },
          statements: [["content", "show_", ["loc", [null, [23, 27], [23, 36]]]], ["content", "content.title", ["loc", [null, [24, 31], [24, 48]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 26,
                "column": 6
              },
              "end": {
                "line": 28,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "tip-desc");
            var el2 = dom.createComment("");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
            return morphs;
          },
          statements: [["content", "content.description", ["loc", [null, [27, 30], [27, 53]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        var child0 = (function () {
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 32,
                  "column": 12
                },
                "end": {
                  "line": 47,
                  "column": 12
                }
              },
              "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("tr");
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createTextNode("\n                  ");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n                ");
              dom.appendChild(el1, el2);
              var el2 = dom.createElement("td");
              var el3 = dom.createTextNode("\n                  ");
              dom.appendChild(el2, el3);
              var el3 = dom.createComment("");
              dom.appendChild(el2, el3);
              var el3 = dom.createTextNode("\n                ");
              dom.appendChild(el2, el3);
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("\n              ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element0 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 1, 1);
              morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 1, 1);
              return morphs;
            },
            statements: [["content", "prop.name", ["loc", [null, [35, 18], [35, 31]]]], ["inline", "txt", [["get", "prop.value", ["loc", [null, [38, 24], [38, 34]]]]], ["type", ["subexpr", "@mut", [["get", "prop.type", ["loc", [null, [39, 23], [39, 32]]]]], [], []], "format", ["subexpr", "@mut", [["get", "prop.format", ["loc", [null, [40, 25], [40, 36]]]]], [], []], "timeZone", ["subexpr", "@mut", [["get", "prop.timeZone", ["loc", [null, [41, 27], [41, 40]]]]], [], []], "valueFormat", ["subexpr", "@mut", [["get", "prop.valueFormat", ["loc", [null, [42, 30], [42, 46]]]]], [], []], "valueTimeZone", ["subexpr", "@mut", [["get", "prop.valueTimeZone", ["loc", [null, [43, 32], [43, 50]]]]], [], []], "valueUnit", ["subexpr", "@mut", [["get", "prop.valueUnit", ["loc", [null, [44, 28], [44, 42]]]]], [], []]], ["loc", [null, [38, 18], [44, 44]]]]],
            locals: ["prop"],
            templates: []
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 29,
                "column": 6
              },
              "end": {
                "line": 50,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "tip-props");
            var el2 = dom.createTextNode("\n          ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("table");
            var el3 = dom.createTextNode("\n");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("          ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n        ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1, 1]), 1, 1);
            return morphs;
          },
          statements: [["block", "each", [["get", "content.properties", ["loc", [null, [32, 20], [32, 38]]]]], [], 0, null, ["loc", [null, [32, 12], [47, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 54,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "bubble-container");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "bubble");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1, 1]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(element1, 1, 1);
          morphs[1] = dom.createMorphAt(element1, 2, 2);
          morphs[2] = dom.createMorphAt(element1, 3, 3);
          return morphs;
        },
        statements: [["block", "if", [["get", "content.title", ["loc", [null, [23, 12], [23, 25]]]]], [], 0, null, ["loc", [null, [23, 6], [25, 13]]]], ["block", "if", [["get", "content.description", ["loc", [null, [26, 12], [26, 31]]]]], [], 1, null, ["loc", [null, [26, 6], [28, 13]]]], ["block", "if", [["get", "content.properties", ["loc", [null, [29, 12], [29, 30]]]]], [], 2, null, ["loc", [null, [29, 6], [50, 13]]]]],
        locals: ["content"],
        templates: [child0, child1, child2]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 55,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/em-tooltip.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "each", [["get", "_contents", ["loc", [null, [19, 8], [19, 17]]]]], [], 0, null, ["loc", [null, [19, 0], [54, 9]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/error-bar", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 2
            },
            "end": {
              "line": 23,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/error-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("b");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" :\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "code", ["loc", [null, [22, 7], [22, 15]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 27,
              "column": 63
            },
            "end": {
              "line": 29,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/error-bar.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("b");
          var el2 = dom.createTextNode("Stack:");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          return morphs;
        },
        statements: [["content", "stack", ["loc", [null, [28, 4], [28, 13]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 32,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/error-bar.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "message");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.setAttribute(el2, "class", "fa fa-exclamation-circle");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("i");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("i");
        dom.setAttribute(el1, "class", "close-button fa fa-arrow-circle-down");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var element1 = dom.childAt(element0, [7]);
        var element2 = dom.childAt(fragment, [3]);
        var element3 = dom.childAt(fragment, [5]);
        var morphs = new Array(8);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createAttrMorph(element1, 'class');
        morphs[4] = dom.createAttrMorph(element2, 'class');
        morphs[5] = dom.createUnsafeMorphAt(element2, 0, 0);
        morphs[6] = dom.createMorphAt(element2, 1, 1);
        morphs[7] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["element", "action", ["toggleDetailsDisplay"], [], ["loc", [null, [19, 21], [19, 54]]]], ["block", "if", [["get", "code", ["loc", [null, [21, 8], [21, 12]]]]], [], 0, null, ["loc", [null, [21, 2], [23, 9]]]], ["content", "message", ["loc", [null, [24, 2], [24, 13]]]], ["attribute", "class", ["concat", ["show-details fa ", ["subexpr", "if", [["get", "showDetails", ["loc", [null, [25, 33], [25, 44]]]], "fa-minus-circle", "fa-plus-circle"], [], ["loc", [null, [25, 28], [25, 81]]]]]]], ["attribute", "class", ["concat", ["details ", ["subexpr", "if", [["get", "showDetails", ["loc", [null, [27, 25], [27, 36]]]], "visible"], [], ["loc", [null, [27, 20], [27, 48]]]]]]], ["content", "details", ["loc", [null, [27, 50], [27, 63]]]], ["block", "if", [["get", "stack", ["loc", [null, [27, 69], [27, 74]]]]], [], 1, null, ["loc", [null, [27, 63], [29, 9]]]], ["element", "action", ["close"], [], ["loc", [null, [31, 48], [31, 66]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/form-element/errors", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/errors.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "class", "help-block");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "errors.firstObject", ["loc", [null, [2, 29], [2, 51]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 7
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/errors.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "showErrors", ["loc", [null, [1, 6], [1, 16]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/feedback-icon", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/feedback-icon.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("span");
          dom.setAttribute(el1, "aria-hidden", "true");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["form-control-feedback ", ["get", "iconName", ["loc", [null, [2, 41], [2, 49]]]]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 7
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/feedback-icon.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasFeedback", ["loc", [null, [1, 6], [1, 17]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/horizontal/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/horizontal/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "checkbox");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("label");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [1, 14], [1, 38]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [1, 43], [1, 73]]]]]]], ["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 25], [4, 29]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 54], [4, 59]]]]], [], []]], ["loc", [null, [4, 12], [4, 61]]]], ["content", "label", ["loc", [null, [4, 62], [4, 71]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [7, 4], [7, 48]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/form-element/horizontal/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'for');
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]]]]], ["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 76], [2, 85]]]], "-", ["get", "name", ["loc", [null, [2, 90], [2, 94]]]]], [], ["loc", [null, [2, 67], [2, 96]]]]]]], ["content", "label", ["loc", [null, [2, 98], [2, 107]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "bs-input", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 30], [4, 39]]]], "-", ["get", "name", ["loc", [null, [4, 44], [4, 48]]]]], [], ["loc", [null, [4, 22], [4, 49]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 55], [4, 59]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [4, 65], [4, 76]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 83], [4, 88]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 101], [4, 112]]]]], [], []]], ["loc", [null, [4, 8], [4, 114]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "bs-input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 24], [10, 28]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [10, 34], [10, 45]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 52], [10, 57]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [10, 70], [10, 81]]]]], [], []]], ["loc", [null, [10, 8], [10, 83]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/horizontal/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/form-element/horizontal/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'for');
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]]]]], ["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 76], [2, 85]]]], "-", ["get", "name", ["loc", [null, [2, 90], [2, 94]]]]], [], ["loc", [null, [2, 67], [2, 96]]]]]]], ["content", "label", ["loc", [null, [2, 98], [2, 107]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "bs-select", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 31], [4, 40]]]], "-", ["get", "name", ["loc", [null, [4, 45], [4, 49]]]]], [], ["loc", [null, [4, 23], [4, 50]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 56], [4, 60]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 69], [4, 76]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "selectValueProperty", ["loc", [null, [4, 93], [4, 112]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "selectLabelProperty", ["loc", [null, [4, 129], [4, 148]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 155], [4, 160]]]]], [], []]], ["loc", [null, [4, 8], [4, 162]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "bs-select", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 25], [10, 29]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [10, 38], [10, 45]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "selectValueProperty", ["loc", [null, [10, 62], [10, 81]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "selectLabelProperty", ["loc", [null, [10, 98], [10, 117]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 124], [10, 129]]]]], [], []]], ["loc", [null, [10, 8], [10, 131]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/horizontal/select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/form-element/horizontal/select2", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/select2.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'for');
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]]]]], ["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 76], [2, 85]]]], "-", ["get", "name", ["loc", [null, [2, 90], [2, 94]]]]], [], ["loc", [null, [2, 67], [2, 96]]]]]]], ["content", "label", ["loc", [null, [2, 98], [2, 107]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "select-2", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 30], [4, 39]]]], "-", ["get", "name", ["loc", [null, [4, 44], [4, 48]]]]], [], ["loc", [null, [4, 22], [4, 49]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 55], [4, 59]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 68], [4, 75]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [4, 92], [4, 111]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [4, 128], [4, 147]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 154], [4, 159]]]]], [], []], "searchEnabled", false], ["loc", [null, [4, 8], [4, 181]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/select2.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "select-2", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 24], [10, 28]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [10, 37], [10, 44]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [10, 61], [10, 80]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [10, 97], [10, 116]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 123], [10, 128]]]]], [], []], "searchEnabled", false], ["loc", [null, [10, 8], [10, 150]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/horizontal/select2.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/form-element/horizontal/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "missing-wrapper",
            "problems": ["multiple-nodes"]
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 8,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/textarea.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element1 = dom.childAt(fragment, [1]);
          var element2 = dom.childAt(fragment, [3]);
          var morphs = new Array(7);
          morphs[0] = dom.createAttrMorph(element1, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'for');
          morphs[2] = dom.createMorphAt(element1, 0, 0);
          morphs[3] = dom.createAttrMorph(element2, 'class');
          morphs[4] = dom.createMorphAt(element2, 1, 1);
          morphs[5] = dom.createMorphAt(element2, 3, 3);
          morphs[6] = dom.createMorphAt(element2, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["control-label ", ["get", "horizontalLabelGridClass", ["loc", [null, [2, 34], [2, 58]]]]]]], ["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 76], [2, 85]]]], "-", ["get", "name", ["loc", [null, [2, 90], [2, 94]]]]], [], ["loc", [null, [2, 67], [2, 96]]]]]]], ["content", "label", ["loc", [null, [2, 98], [2, 107]]]], ["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [3, 18], [3, 42]]]]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 33], [4, 42]]]], "-", ["get", "name", ["loc", [null, [4, 47], [4, 51]]]]], [], ["loc", [null, [4, 25], [4, 52]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 58], [4, 62]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 69], [4, 74]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 87], [4, 98]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 104], [4, 108]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 114], [4, 118]]]]], [], []]], ["loc", [null, [4, 8], [4, 120]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 8], [5, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 8], [6, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 0
            },
            "end": {
              "line": 14,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/horizontal/textarea.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n        ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(4);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          morphs[2] = dom.createMorphAt(element0, 3, 3);
          morphs[3] = dom.createMorphAt(element0, 5, 5);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["get", "horizontalInputGridClass", ["loc", [null, [9, 18], [9, 42]]]], " ", ["get", "horizontalInputOffsetGridClass", ["loc", [null, [9, 47], [9, 77]]]]]]], ["inline", "bs-textarea", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [10, 27], [10, 31]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [10, 38], [10, 43]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [10, 56], [10, 67]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [10, 73], [10, 77]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [10, 83], [10, 87]]]]], [], []]], ["loc", [null, [10, 8], [10, 89]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [11, 8], [11, 59]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [12, 8], [12, 52]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/horizontal/textarea.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, 1, ["loc", [null, [1, 0], [14, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/form-element/inline/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/inline/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "checkbox");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [3, 21], [3, 25]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 50], [3, 55]]]]], [], []]], ["loc", [null, [3, 8], [3, 57]]]], ["content", "label", ["loc", [null, [3, 58], [3, 67]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/form-element/inline/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/inline/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/inline/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-input", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 22], [4, 31]]]], "-", ["get", "name", ["loc", [null, [4, 36], [4, 40]]]]], [], ["loc", [null, [4, 14], [4, 41]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 47], [4, 51]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [4, 57], [4, 68]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 75], [4, 80]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 93], [4, 104]]]]], [], []]], ["loc", [null, [4, 0], [4, 106]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/inline/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/inline/select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/inline/select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-select", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 23], [4, 32]]]], "-", ["get", "name", ["loc", [null, [4, 37], [4, 41]]]]], [], ["loc", [null, [4, 15], [4, 42]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 48], [4, 52]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 61], [4, 68]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "selectValueProperty", ["loc", [null, [4, 85], [4, 104]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "selectLabelProperty", ["loc", [null, [4, 121], [4, 140]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 147], [4, 152]]]]], [], []]], ["loc", [null, [4, 0], [4, 154]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/inline/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/inline/textarea.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 44
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/inline/textarea.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 25], [4, 34]]]], "-", ["get", "name", ["loc", [null, [4, 39], [4, 43]]]]], [], ["loc", [null, [4, 17], [4, 44]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 50], [4, 54]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 61], [4, 66]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 79], [4, 90]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 96], [4, 100]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 106], [4, 110]]]]], [], []]], ["loc", [null, [4, 0], [4, 112]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/vertical/checkbox", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 44
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/vertical/checkbox.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "checkbox");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        morphs[2] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "input", [], ["name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [3, 21], [3, 25]]]]], [], []], "type", "checkbox", "checked", ["subexpr", "@mut", [["get", "value", ["loc", [null, [3, 50], [3, 55]]]]], [], []]], ["loc", [null, [3, 8], [3, 57]]]], ["content", "label", ["loc", [null, [3, 58], [3, 67]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/form-element/vertical/default", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/vertical/default.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 44
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/vertical/default.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-input", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 22], [4, 31]]]], "-", ["get", "name", ["loc", [null, [4, 36], [4, 40]]]]], [], ["loc", [null, [4, 14], [4, 41]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 47], [4, 51]]]]], [], []], "type", ["subexpr", "@mut", [["get", "controlType", ["loc", [null, [4, 57], [4, 68]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 75], [4, 80]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 93], [4, 104]]]]], [], []]], ["loc", [null, [4, 0], [4, 106]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/vertical/select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/vertical/select.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/vertical/select.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-select", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 23], [4, 32]]]], "-", ["get", "name", ["loc", [null, [4, 37], [4, 41]]]]], [], ["loc", [null, [4, 15], [4, 42]]]], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 48], [4, 52]]]]], [], []], "content", ["subexpr", "@mut", [["get", "choices", ["loc", [null, [4, 61], [4, 68]]]]], [], []], "optionValuePath", ["subexpr", "@mut", [["get", "choiceValueProperty", ["loc", [null, [4, 85], [4, 104]]]]], [], []], "optionLabelPath", ["subexpr", "@mut", [["get", "choiceLabelProperty", ["loc", [null, [4, 121], [4, 140]]]]], [], []], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 147], [4, 152]]]]], [], []]], ["loc", [null, [4, 0], [4, 154]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/form-element/vertical/textarea", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": {
            "name": "triple-curlies"
          },
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 3,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/form-element/vertical/textarea.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("label");
          dom.setAttribute(el1, "class", "control-label");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'for');
          morphs[1] = dom.createMorphAt(element0, 0, 0);
          return morphs;
        },
        statements: [["attribute", "for", ["concat", [["subexpr", "concat", [["get", "elementId", ["loc", [null, [2, 47], [2, 56]]]], "-", ["get", "name", ["loc", [null, [2, 61], [2, 65]]]]], [], ["loc", [null, [2, 38], [2, 67]]]]]]], ["content", "label", ["loc", [null, [2, 69], [2, 78]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 6,
            "column": 44
          }
        },
        "moduleName": "tez-ui/templates/components/form-element/vertical/textarea.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        morphs[3] = dom.createMorphAt(fragment, 5, 5, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "hasLabel", ["loc", [null, [1, 6], [1, 14]]]]], [], 0, null, ["loc", [null, [1, 0], [3, 7]]]], ["inline", "bs-textarea", [], ["id", ["subexpr", "concat", [["get", "elementId", ["loc", [null, [4, 25], [4, 34]]]], "-", ["get", "name", ["loc", [null, [4, 39], [4, 43]]]]], [], ["loc", [null, [4, 17], [4, 44]]]], "value", ["subexpr", "@mut", [["get", "value", ["loc", [null, [4, 51], [4, 56]]]]], [], []], "name", ["subexpr", "@mut", [["get", "name", ["loc", [null, [4, 62], [4, 66]]]]], [], []], "placeholder", ["subexpr", "@mut", [["get", "placeholder", ["loc", [null, [4, 79], [4, 90]]]]], [], []], "cols", ["subexpr", "@mut", [["get", "cols", ["loc", [null, [4, 96], [4, 100]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "rows", ["loc", [null, [4, 106], [4, 110]]]]], [], []]], ["loc", [null, [4, 0], [4, 112]]]], ["inline", "partial", ["components/form-element/feedback-icon"], [], ["loc", [null, [5, 0], [5, 51]]]], ["inline", "partial", ["components/form-element/errors"], [], ["loc", [null, [6, 0], [6, 44]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("tez-ui/templates/components/stats-link", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 20,
                "column": 2
              },
              "end": {
                "line": 22,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/components/stats-link.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(2);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
            return morphs;
          },
          statements: [["inline", "txt", [["get", "value", ["loc", [null, [21, 10], [21, 15]]]]], ["type", "number"], ["loc", [null, [21, 4], [21, 31]]]], ["content", "_statsType", ["loc", [null, [21, 32], [21, 46]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 23,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/stats-link.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "link-to", [["get", "routeName", ["loc", [null, [20, 13], [20, 22]]]], ["subexpr", "query-params", [], ["searchText", ["get", "searchText", ["loc", [null, [20, 48], [20, 58]]]]], ["loc", [null, [20, 23], [20, 59]]]]], [], 0, null, ["loc", [null, [20, 2], [22, 14]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 0
            },
            "end": {
              "line": 25,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/components/stats-link.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "txt", [["get", "value", ["loc", [null, [24, 8], [24, 13]]]]], ["type", "number"], ["loc", [null, [24, 2], [24, 29]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 26,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/stats-link.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "value", ["loc", [null, [19, 6], [19, 11]]]]], [], 0, 1, ["loc", [null, [19, 0], [25, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/components/tab-n-refresh", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 22,
                "column": 6
              },
              "end": {
                "line": 24,
                "column": 6
              }
            },
            "moduleName": "tez-ui/templates/components/tab-n-refresh.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("        ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "tab.text", ["loc", [null, [23, 8], [23, 20]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/tab-n-refresh.hbs"
        },
        isEmpty: false,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("\n");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createMorphAt(element0, 1, 1);
          return morphs;
        },
        statements: [["attribute", "class", ["concat", [["subexpr", "if", [["get", "tab.active", ["loc", [null, [21, 20], [21, 30]]]], "active"], [], ["loc", [null, [21, 15], [21, 41]]]]]]], ["block", "link-to", [["get", "tab.routeName", ["loc", [null, [22, 17], [22, 30]]]]], [], 0, null, ["loc", [null, [22, 6], [24, 18]]]]],
        locals: ["tab"],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 34,
              "column": 6
            },
            "end": {
              "line": 36,
              "column": 6
            }
          },
          "moduleName": "tez-ui/templates/components/tab-n-refresh.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        Last refreshed at ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("b");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [35, 54], [35, 62]]]]], [], []]], ["loc", [null, [35, 29], [35, 64]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 36,
              "column": 6
            },
            "end": {
              "line": 38,
              "column": 6
            }
          },
          "moduleName": "tez-ui/templates/components/tab-n-refresh.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        Load time not available!\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 44,
            "column": 5
          }
        },
        "moduleName": "tez-ui/templates/components/tab-n-refresh.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        dom.setAttribute(el1, "class", "nav nav-tabs tab-n-refresh");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("span");
        dom.setAttribute(el2, "class", "refresh-ui");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("span");
        dom.setAttribute(el3, "class", "text-elements");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("span");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        Auto Refresh\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "type", "button");
        dom.setAttribute(el3, "class", "btn btn-success");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("i");
        dom.setAttribute(el4, "class", "fa fa-refresh");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Refresh\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [1]);
        var element2 = dom.childAt(element1, [3]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element2, [3]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element1, 1, 1);
        morphs[1] = dom.createAttrMorph(element4, 'class');
        morphs[2] = dom.createMorphAt(element4, 1, 1);
        morphs[3] = dom.createMorphAt(element3, 3, 3);
        morphs[4] = dom.createElementMorph(element5);
        return morphs;
      },
      statements: [["block", "each", [["get", "normalizedTabs", ["loc", [null, [20, 10], [20, 24]]]]], [], 0, null, ["loc", [null, [20, 2], [26, 11]]]], ["attribute", "class", ["concat", ["auto-refresh ", ["subexpr", "unless", [["get", "autoRefreshVisible", ["loc", [null, [29, 41], [29, 59]]]], "no-visible"], [], ["loc", [null, [29, 32], [29, 74]]]]]]], ["inline", "input", [], ["type", "checkbox", "name", "autoEnabled", "checked", ["subexpr", "@mut", [["get", "autoRefreshEnabled", ["loc", [null, [30, 59], [30, 77]]]]], [], []]], ["loc", [null, [30, 8], [30, 79]]]], ["block", "if", [["get", "loadTime", ["loc", [null, [34, 12], [34, 20]]]]], [], 1, 2, ["loc", [null, [34, 6], [38, 13]]]], ["element", "action", ["refresh"], [], ["loc", [null, [40, 50], [40, 70]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/components/table-controls", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "modifiers",
          "modifiers": ["action"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/components/table-controls.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("i");
        dom.setAttribute(el1, "class", "fa fa-cog");
        dom.setAttribute(el1, "title", "Customize");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1]);
        var morphs = new Array(1);
        morphs[0] = dom.createElementMorph(element0);
        return morphs;
      },
      statements: [["element", "action", ["cogClicked"], [], ["loc", [null, [19, 39], [19, 62]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/components/zip-download-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 20,
              "column": 2
            },
            "end": {
              "line": 23,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/zip-download-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-lg fa-exclamation-circle");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    Error downloading data!\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 23,
              "column": 2
            },
            "end": {
              "line": 26,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/zip-download-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("i");
          dom.setAttribute(el1, "class", "fa fa-lg fa-spinner fa-spin");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n    Downloading data for dag: ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("b");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]), 0, 0);
          return morphs;
        },
        statements: [["content", "content.dag.entityID", ["loc", [null, [25, 33], [25, 57]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 31,
              "column": 2
            },
            "end": {
              "line": 33,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/zip-download-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "btn btn-primary");
          dom.setAttribute(el1, "data-dismiss", "modal");
          dom.setAttribute(el1, "aria-label", "Close");
          var el2 = dom.createTextNode("Ok");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    var child3 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 33,
              "column": 2
            },
            "end": {
              "line": 35,
              "column": 2
            }
          },
          "moduleName": "tez-ui/templates/components/zip-download-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("button");
          dom.setAttribute(el1, "type", "button");
          dom.setAttribute(el1, "class", "btn");
          dom.setAttribute(el1, "data-dismiss", "modal");
          dom.setAttribute(el1, "aria-label", "Close");
          var el2 = dom.createTextNode("Cancel");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createElementMorph(element0);
          return morphs;
        },
        statements: [["element", "action", ["cancel"], [], ["loc", [null, [34, 78], [34, 97]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/components/zip-download-modal.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "message");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "form-actions");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
        return morphs;
      },
      statements: [["block", "if", [["get", "content.downloader.failed", ["loc", [null, [20, 8], [20, 33]]]]], [], 0, 1, ["loc", [null, [20, 2], [26, 9]]]], ["block", "if", [["get", "content.downloader.failed", ["loc", [null, [31, 8], [31, 33]]]]], [], 2, 3, ["loc", [null, [31, 2], [35, 9]]]]],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  })());
});
define("tez-ui/templates/dag", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "tez-ui/templates/dag.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 35], [19, 43]]]]], [], []], "autoRefreshEnabled", ["subexpr", "@mut", [["get", "polling.active", ["loc", [null, [19, 63], [19, 77]]]]], [], []]], ["loc", [null, [19, 0], [19, 79]]]], ["content", "outlet", ["loc", [null, [20, 0], [20, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/dag/attempts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/attempts.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/counters", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "columns", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "counters", ["loc", [null, [22, 7], [22, 15]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "countersCount", ["loc", [null, [24, 11], [24, 24]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [25, 13], [25, 23]]]]], [], []], "enablePagination", false, "searchAction", "searchChanged", "sortAction", "sortChanged"], ["loc", [null, [20, 2], [31, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [33, 2], [33, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/counters.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [34, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/graphical", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 30,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/graphical.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("br");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "id", "graphical-view-component-container");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "dag-view-legend");
          var el3 = dom.createTextNode("Refresh updates only the tooltip values. When sources & sinks are hidden, double click green bubble to toggle visibility locally.");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [3]), 1, 1);
          return morphs;
        },
        statements: [["inline", "em-tgraph", [], ["data", ["subexpr", "@mut", [["get", "viewData", ["loc", [null, [23, 11], [23, 19]]]]], [], []], "vertexProperties", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [24, 23], [24, 37]]]]], [], []], "entityClicked", "entityClicked", "configure", "openColumnSelector"], ["loc", [null, [22, 4], [27, 6]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/graphical.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [31, 2], [31, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 33,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/graphical.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [32, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 35,
                "column": 10
              },
              "end": {
                "line": 37,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/dag/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["content", "model.appID", ["loc", [null, [36, 12], [36, 27]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 80,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Application ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Name");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Submitter");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Status");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Progress");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Start Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("End Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Logs");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(11);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 1]), 1, 1);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 3]), 1, 1);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [9, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [11, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element0, [13, 3]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element0, [15, 3]), 0, 0);
          morphs[8] = dom.createMorphAt(dom.childAt(element0, [17, 3]), 0, 0);
          morphs[9] = dom.createMorphAt(dom.childAt(element0, [19, 3]), 0, 0);
          morphs[10] = dom.createMorphAt(dom.childAt(element0, [21, 3]), 1, 1);
          return morphs;
        },
        statements: [["inline", "bs-button", [], ["icon", "fa fa-download", "title", "Download data", "defaultText", "Download data", "type", "info", "action", "downloadDagJson"], ["loc", [null, [29, 10], [29, 132]]]], ["block", "link-to", ["app", ["get", "model.appID", ["loc", [null, [35, 27], [35, 38]]]]], ["class", "ember-table-content"], 0, null, ["loc", [null, [35, 10], [37, 22]]]], ["content", "model.entityID", ["loc", [null, [42, 12], [42, 30]]]], ["content", "model.name", ["loc", [null, [46, 12], [46, 26]]]], ["content", "model.submitter", ["loc", [null, [50, 12], [50, 31]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.status", ["loc", [null, [54, 43], [54, 55]]]]], [], []]], ["loc", [null, [54, 12], [54, 57]]]], ["inline", "em-table-progress-cell", [], ["content", ["subexpr", "@mut", [["get", "model.progress", ["loc", [null, [58, 45], [58, 59]]]]], [], []]], ["loc", [null, [58, 12], [58, 61]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.startTime", ["loc", [null, [62, 37], [62, 52]]]]], [], []]], ["loc", [null, [62, 12], [62, 54]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.endTime", ["loc", [null, [66, 37], [66, 50]]]]], [], []]], ["loc", [null, [66, 12], [66, 52]]]], ["inline", "txt", [["get", "model.duration", ["loc", [null, [70, 18], [70, 32]]]]], ["type", "duration"], ["loc", [null, [70, 12], [70, 50]]]], ["inline", "em-table-linked-cell", [], ["content", ["subexpr", "@mut", [["get", "model.containerLogs", ["loc", [null, [75, 41], [75, 60]]]]], [], []]], ["loc", [null, [75, 10], [75, 62]]]]],
        locals: [],
        templates: [child0]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 80,
              "column": 0
            },
            "end": {
              "line": 82,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [81, 2], [81, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    var child2 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 95,
                "column": 2
              },
              "end": {
                "line": 97,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/dag/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "caller-info", [], ["type", ["subexpr", "@mut", [["get", "model.callerType", ["loc", [null, [96, 23], [96, 39]]]]], [], []], "info", ["subexpr", "@mut", [["get", "model.callerInfo", ["loc", [null, [96, 45], [96, 61]]]]], [], []]], ["loc", [null, [96, 4], [96, 63]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 99,
                "column": 2
              },
              "end": {
                "line": 108,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/dag/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "panel panel-danger");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "panel-heading");
            var el3 = dom.createTextNode("\n        Diagnostics\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "diagnostics");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.diagnostics", ["loc", [null, [105, 8], [105, 31]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 94,
              "column": 0
            },
            "end": {
              "line": 109,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
          morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
          dom.insertBoundary(fragment, 0);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [["block", "if", [["get", "model.callerInfo", ["loc", [null, [95, 8], [95, 24]]]]], [], 0, null, ["loc", [null, [95, 2], [97, 9]]]], ["block", "if", [["get", "model.diagnostics", ["loc", [null, [99, 8], [99, 25]]]]], [], 1, null, ["loc", [null, [99, 2], [108, 9]]]]],
        locals: [],
        templates: [child0, child1]
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 110,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("\n  * Splitting the conditional blocks so that stats from inside the outlet,\n    is aligned with the details table.\n  * Keeping outlet outside the conditional block so that the loading of DAG\n    details doesn’t affect the outlet content.\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("span");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 7, 7, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [82, 7]]]], ["attribute", "class", ["concat", [["subexpr", "unless", [["get", "loaded", ["loc", [null, [90, 22], [90, 28]]]], "no-visible"], [], ["loc", [null, [90, 13], [90, 43]]]]]]], ["content", "outlet", ["loc", [null, [91, 2], [91, 12]]]], ["block", "if", [["get", "loaded", ["loc", [null, [94, 6], [94, 12]]]]], [], 2, null, ["loc", [null, [94, 0], [109, 7]]]]],
      locals: [],
      templates: [child0, child1, child2]
    };
  })());
});
define("tez-ui/templates/dag/index/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 79,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/index/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Stats");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Succeeded Vertices");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Total Vertices");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Succeeded Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Total Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Failed Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Killed Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Failed Task Attempts");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Killed Task Attempts");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(9);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [9, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [11, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element0, [13, 3]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element0, [15, 3]), 0, 0);
          morphs[8] = dom.createMorphAt(fragment, 3, 3, contextualElement);
          return morphs;
        },
        statements: [["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.succeededVertices", ["loc", [null, [29, 31], [29, 54]]]]], [], []], "routeName", "dag.vertices", "statsType", "SUCCEEDED"], ["loc", [null, [29, 12], [29, 103]]]], ["content", "stats.totalVertices", ["loc", [null, [33, 12], [33, 35]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.succeededTasks", ["loc", [null, [37, 31], [37, 51]]]]], [], []], "routeName", "dag.tasks", "statsType", "SUCCEEDED"], ["loc", [null, [37, 12], [37, 97]]]], ["content", "stats.totalTasks", ["loc", [null, [41, 12], [41, 32]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.failedTasks", ["loc", [null, [45, 31], [45, 48]]]]], [], []], "routeName", "dag.tasks", "statsType", "FAILED"], ["loc", [null, [45, 12], [45, 91]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.killedTasks", ["loc", [null, [49, 31], [49, 48]]]]], [], []], "routeName", "dag.tasks", "statsType", "KILLED"], ["loc", [null, [49, 12], [49, 91]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.failedTaskAttempts", ["loc", [null, [53, 31], [53, 55]]]]], [], []], "routeName", "dag.attempts", "statsType", "FAILED"], ["loc", [null, [53, 12], [53, 101]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "stats.killedTaskAttempts", ["loc", [null, [57, 31], [57, 55]]]]], [], []], "routeName", "dag.attempts", "statsType", "KILLED"], ["loc", [null, [57, 12], [57, 101]]]], ["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [63, 10], [63, 24]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [64, 7], [64, 12]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [66, 13], [66, 23]]]]], [], []], "enableSearch", false, "enablePagination", false, "rowCount", ["subexpr", "@mut", [["get", "model.length", ["loc", [null, [71, 11], [71, 23]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [62, 2], [78, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 79,
              "column": 0
            },
            "end": {
              "line": 81,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/index/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [80, 2], [80, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 82,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/index/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [81, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/swimlane", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/swimlane.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "swimlane-page");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "button-panel");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("div");
          dom.setAttribute(el3, "class", "zoom-range");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("%\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-cog fa-border");
          dom.setAttribute(el3, "title", "Customize vertex tooltip");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-expand fa-border");
          dom.setAttribute(el3, "title", "Toggle fullscreen");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("i");
          dom.setAttribute(el3, "class", "fa fa-compress fa-border");
          dom.setAttribute(el3, "title", "Toggle fullscreen");
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var element2 = dom.childAt(element1, [1]);
          var element3 = dom.childAt(element1, [3]);
          var element4 = dom.childAt(element1, [5]);
          var element5 = dom.childAt(element1, [7]);
          var morphs = new Array(6);
          morphs[0] = dom.createMorphAt(element2, 1, 1);
          morphs[1] = dom.createMorphAt(element2, 3, 3);
          morphs[2] = dom.createElementMorph(element3);
          morphs[3] = dom.createElementMorph(element4);
          morphs[4] = dom.createElementMorph(element5);
          morphs[5] = dom.createMorphAt(element0, 3, 3);
          return morphs;
        },
        statements: [["content", "zoom", ["loc", [null, [23, 8], [23, 16]]]], ["inline", "input", [], ["type", "range", "value", ["subexpr", "@mut", [["get", "zoom", ["loc", [null, [24, 35], [24, 39]]]]], [], []], "min", 100, "max", 1000], ["loc", [null, [24, 8], [24, 58]]]], ["element", "action", ["openColumnSelector"], [], ["loc", [null, [26, 37], [26, 68]]]], ["element", "action", ["toggleFullscreen"], [], ["loc", [null, [27, 40], [27, 69]]]], ["element", "action", ["toggleFullscreen"], [], ["loc", [null, [28, 42], [28, 71]]]], ["inline", "em-swimlane", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [32, 14], [32, 28]]]]], [], []], "processes", ["subexpr", "@mut", [["get", "processes", ["loc", [null, [33, 16], [33, 25]]]]], [], []], "nameComponent", "em-swimlane-vertex-name", "zoom", ["subexpr", "@mut", [["get", "zoom", ["loc", [null, [35, 11], [35, 15]]]]], [], []], "click", "click", "consolidate", true], ["loc", [null, [31, 4], [38, 6]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 0
            },
            "end": {
              "line": 42,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/swimlane.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [41, 2], [41, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 43,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/swimlane.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [42, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/tasks", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/tasks.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/tasks.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/tasks.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dag/vertices", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/vertices.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dag/vertices.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dag/vertices.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/dags", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 0
            },
            "end": {
              "line": 40,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dags.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [23, 12], [23, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [24, 9], [24, 14]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "rowCount", ["loc", [null, [25, 13], [25, 21]]]]], [], []], "classNames", "all-dags-table", "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [29, 25], [29, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [31, 15], [31, 25]]]]], [], []], "enableSort", false, "rowAction", "rowCountChanged", "search", "search", "loadPage", "loadPage", "reload", "reload"], ["loc", [null, [22, 2], [39, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 40,
              "column": 0
            },
            "end": {
              "line": 42,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/dags.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [41, 2], [41, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 43,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/dags.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "autoRefreshVisible", false, "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 60], [19, 68]]]]], [], []]], ["loc", [null, [19, 0], [19, 70]]]], ["block", "if", [["get", "loaded", ["loc", [null, [21, 6], [21, 12]]]]], [], 0, 1, ["loc", [null, [21, 0], [42, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/loading", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/loading.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Loading...");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "progress");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "progress-bar progress-bar-striped active");
        dom.setAttribute(el2, "role", "progressbar");
        dom.setAttribute(el2, "style", "width:100%");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() {
        return [];
      },
      statements: [],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/simple-modal", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 28,
              "column": 6
            },
            "end": {
              "line": 30,
              "column": 6
            }
          },
          "moduleName": "tez-ui/templates/simple-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "component", [["get", "model.componentName", ["loc", [null, [29, 20], [29, 39]]]]], ["content", ["subexpr", "@mut", [["get", "model.content", ["loc", [null, [29, 48], [29, 61]]]]], [], []], "targetObject", ["subexpr", "@mut", [["get", "model.targetObject", ["loc", [null, [29, 75], [29, 93]]]]], [], []]], ["loc", [null, [29, 8], [29, 95]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 30,
              "column": 6
            },
            "end": {
              "line": 32,
              "column": 6
            }
          },
          "moduleName": "tez-ui/templates/simple-modal.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1, "class", "modal-body");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]), 0, 0);
          return morphs;
        },
        statements: [["content", "model.content", ["loc", [null, [31, 32], [31, 49]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 6
          }
        },
        "moduleName": "tez-ui/templates/simple-modal.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "modal fade simple-modal");
        dom.setAttribute(el1, "tabindex", "-1");
        dom.setAttribute(el1, "role", "dialog");
        dom.setAttribute(el1, "aria-labelledby", "myLargeModalLabel");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "modal-dialog");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "modal-content");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "modal-header");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("button");
        dom.setAttribute(el5, "type", "button");
        dom.setAttribute(el5, "class", "close");
        dom.setAttribute(el5, "data-dismiss", "modal");
        dom.setAttribute(el5, "aria-label", "Close");
        var el6 = dom.createTextNode("\n          ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("span");
        dom.setAttribute(el6, "aria-hidden", "true");
        var el7 = dom.createTextNode("×");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n        ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("h4");
        dom.setAttribute(el5, "class", "modal-title");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [1, 1, 1]);
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
        morphs[1] = dom.createMorphAt(element0, 3, 3);
        return morphs;
      },
      statements: [["content", "model.title", ["loc", [null, [26, 32], [26, 47]]]], ["block", "if", [["get", "model.componentName", ["loc", [null, [28, 12], [28, 31]]]]], [], 0, 1, ["loc", [null, [28, 6], [32, 13]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/task", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "tez-ui/templates/task.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 35], [19, 43]]]]], [], []], "autoRefreshEnabled", ["subexpr", "@mut", [["get", "polling.active", ["loc", [null, [19, 63], [19, 77]]]]], [], []]], ["loc", [null, [19, 0], [19, 79]]]], ["content", "outlet", ["loc", [null, [20, 0], [20, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/task/attempts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/task/attempts.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/task/counters", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "columns", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "counters", ["loc", [null, [22, 7], [22, 15]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "countersCount", ["loc", [null, [24, 11], [24, 24]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [25, 13], [25, 23]]]]], [], []], "enablePagination", false, "searchAction", "searchChanged", "sortAction", "sortChanged"], ["loc", [null, [20, 2], [31, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [33, 2], [33, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/task/counters.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [34, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/task/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        var child0 = (function () {
          var child0 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.2.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 62,
                    "column": 16
                  },
                  "end": {
                    "line": 70,
                    "column": 16
                  }
                },
                "moduleName": "tez-ui/templates/task/index.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "target", "_blank");
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("i");
                dom.setAttribute(el2, "class", "fa fa-file-o");
                dom.setAttribute(el2, "aria-hidden", "true");
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode(" View\n                  ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n                   \n                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("a");
                dom.setAttribute(el1, "target", "_blank");
                dom.setAttribute(el1, "download", "");
                var el2 = dom.createTextNode("\n                    ");
                dom.appendChild(el1, el2);
                var el2 = dom.createElement("i");
                dom.setAttribute(el2, "class", "fa fa-download");
                dom.setAttribute(el2, "aria-hidden", "true");
                dom.appendChild(el1, el2);
                var el2 = dom.createTextNode(" Download\n                  ");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
                var element0 = dom.childAt(fragment, [1]);
                var element1 = dom.childAt(fragment, [3]);
                var morphs = new Array(2);
                morphs[0] = dom.createAttrMorph(element0, 'href');
                morphs[1] = dom.createAttrMorph(element1, 'href');
                return morphs;
              },
              statements: [["attribute", "href", ["get", "attempt.logURL", ["loc", [null, [63, 28], [63, 42]]]]], ["attribute", "href", ["get", "attempt.logURL", ["loc", [null, [67, 28], [67, 42]]]]]],
              locals: [],
              templates: []
            };
          })();
          var child1 = (function () {
            return {
              meta: {
                "fragmentReason": false,
                "revision": "Ember@2.2.0",
                "loc": {
                  "source": null,
                  "start": {
                    "line": 70,
                    "column": 16
                  },
                  "end": {
                    "line": 72,
                    "column": 16
                  }
                },
                "moduleName": "tez-ui/templates/task/index.hbs"
              },
              isEmpty: false,
              arity: 0,
              cachedFragment: null,
              hasRendered: false,
              buildFragment: function buildFragment(dom) {
                var el0 = dom.createDocumentFragment();
                var el1 = dom.createTextNode("                  ");
                dom.appendChild(el0, el1);
                var el1 = dom.createElement("span");
                dom.setAttribute(el1, "class", "txt-message");
                var el2 = dom.createTextNode("Not Available!");
                dom.appendChild(el1, el2);
                dom.appendChild(el0, el1);
                var el1 = dom.createTextNode("\n");
                dom.appendChild(el0, el1);
                return el0;
              },
              buildRenderNodes: function buildRenderNodes() {
                return [];
              },
              statements: [],
              locals: [],
              templates: []
            };
          })();
          return {
            meta: {
              "fragmentReason": false,
              "revision": "Ember@2.2.0",
              "loc": {
                "source": null,
                "start": {
                  "line": 59,
                  "column": 12
                },
                "end": {
                  "line": 74,
                  "column": 12
                }
              },
              "moduleName": "tez-ui/templates/task/index.hbs"
            },
            isEmpty: false,
            arity: 1,
            cachedFragment: null,
            hasRendered: false,
            buildFragment: function buildFragment(dom) {
              var el0 = dom.createDocumentFragment();
              var el1 = dom.createTextNode("              ");
              dom.appendChild(el0, el1);
              var el1 = dom.createElement("dag");
              dom.setAttribute(el1, "class", "display-block");
              var el2 = dom.createTextNode("\n                Attempt ");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode(" : \n");
              dom.appendChild(el1, el2);
              var el2 = dom.createComment("");
              dom.appendChild(el1, el2);
              var el2 = dom.createTextNode("              ");
              dom.appendChild(el1, el2);
              dom.appendChild(el0, el1);
              var el1 = dom.createTextNode("\n");
              dom.appendChild(el0, el1);
              return el0;
            },
            buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
              var element2 = dom.childAt(fragment, [1]);
              var morphs = new Array(2);
              morphs[0] = dom.createMorphAt(element2, 1, 1);
              morphs[1] = dom.createMorphAt(element2, 3, 3);
              return morphs;
            },
            statements: [["content", "attempt.index", ["loc", [null, [61, 24], [61, 41]]]], ["block", "if", [["get", "attempt.logURL", ["loc", [null, [62, 22], [62, 36]]]]], [], 0, 1, ["loc", [null, [62, 16], [72, 23]]]]],
            locals: ["attempt"],
            templates: [child0, child1]
          };
        })();
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 58,
                "column": 10
              },
              "end": {
                "line": 75,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/task/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
            dom.insertBoundary(fragment, 0);
            dom.insertBoundary(fragment, null);
            return morphs;
          },
          statements: [["block", "each", [["get", "attempts", ["loc", [null, [59, 20], [59, 28]]]]], [], 0, null, ["loc", [null, [59, 12], [74, 21]]]]],
          locals: [],
          templates: [child0]
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 75,
                "column": 10
              },
              "end": {
                "line": 77,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/task/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("i");
            dom.setAttribute(el1, "class", "fa fa-spinner fa-spin");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode(" Loading...\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes() {
            return [];
          },
          statements: [],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 97,
                "column": 2
              },
              "end": {
                "line": 106,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/task/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "panel panel-danger");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "panel-heading");
            var el3 = dom.createTextNode("\n        Diagnostics\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "diagnostics");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.diagnostics", ["loc", [null, [103, 8], [103, 31]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 108,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Task ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Vertex ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Status");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Progress");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Start Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("End Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Logs");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Stats");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n    ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Failed Task Attempts");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element3 = dom.childAt(fragment, [1, 3]);
          var morphs = new Array(10);
          morphs[0] = dom.createMorphAt(dom.childAt(element3, [1, 3]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element3, [3, 3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element3, [5, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element3, [7, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element3, [9, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element3, [11, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element3, [13, 3]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element3, [15, 3]), 1, 1);
          morphs[8] = dom.createMorphAt(dom.childAt(fragment, [3, 3, 1, 3]), 0, 0);
          morphs[9] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["content", "model.entityID", ["loc", [null, [29, 12], [29, 30]]]], ["content", "model.vertexID", ["loc", [null, [33, 12], [33, 30]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.status", ["loc", [null, [37, 43], [37, 55]]]]], [], []]], ["loc", [null, [37, 12], [37, 57]]]], ["inline", "em-table-progress-cell", [], ["content", ["subexpr", "@mut", [["get", "model.progress", ["loc", [null, [41, 45], [41, 59]]]]], [], []]], ["loc", [null, [41, 12], [41, 61]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.startTime", ["loc", [null, [45, 37], [45, 52]]]]], [], []]], ["loc", [null, [45, 12], [45, 54]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.endTime", ["loc", [null, [49, 37], [49, 50]]]]], [], []]], ["loc", [null, [49, 12], [49, 52]]]], ["inline", "txt", [["get", "model.duration", ["loc", [null, [53, 18], [53, 32]]]]], ["type", "duration"], ["loc", [null, [53, 12], [53, 50]]]], ["block", "if", [["get", "attempts", ["loc", [null, [58, 16], [58, 24]]]]], [], 0, 1, ["loc", [null, [58, 10], [77, 17]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "model.failedTaskAttempts", ["loc", [null, [92, 31], [92, 55]]]]], [], []], "routeName", "task.attempts", "statsType", "FAILED"], ["loc", [null, [92, 12], [92, 102]]]], ["block", "if", [["get", "model.diagnostics", ["loc", [null, [97, 8], [97, 25]]]]], [], 2, null, ["loc", [null, [97, 2], [106, 9]]]]],
        locals: [],
        templates: [child0, child1, child2]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 108,
              "column": 0
            },
            "end": {
              "line": 110,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/task/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [109, 2], [109, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 111,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/task/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [110, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/vertex", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 20,
            "column": 10
          }
        },
        "moduleName": "tez-ui/templates/vertex.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 3, 3, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "tab-n-refresh", [], ["tabs", ["subexpr", "@mut", [["get", "tabs", ["loc", [null, [19, 21], [19, 25]]]]], [], []], "loadTime", ["subexpr", "@mut", [["get", "loadTime", ["loc", [null, [19, 35], [19, 43]]]]], [], []], "autoRefreshEnabled", ["subexpr", "@mut", [["get", "polling.active", ["loc", [null, [19, 63], [19, 77]]]]], [], []]], ["loc", [null, [19, 0], [19, 79]]]], ["content", "outlet", ["loc", [null, [20, 0], [20, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("tez-ui/templates/vertex/attempts", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/attempts.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/vertex/attempts.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/vertex/counters", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 32,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "columns", ["loc", [null, [21, 10], [21, 17]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "counters", ["loc", [null, [22, 7], [22, 15]]]]], [], []], "rowCount", ["subexpr", "@mut", [["get", "countersCount", ["loc", [null, [24, 11], [24, 24]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [25, 13], [25, 23]]]]], [], []], "enablePagination", false, "searchAction", "searchChanged", "sortAction", "sortChanged"], ["loc", [null, [20, 2], [31, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 32,
              "column": 0
            },
            "end": {
              "line": 34,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/counters.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [33, 2], [33, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 35,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/vertex/counters.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [34, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/vertex/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      var child0 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 89,
                "column": 10
              },
              "end": {
                "line": 91,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/vertex/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            [");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("]\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "em-table-linked-cell", [], ["content", ["subexpr", "@mut", [["get", "firstTasksToStart", ["loc", [null, [90, 44], [90, 61]]]]], [], []]], ["loc", [null, [90, 13], [90, 63]]]]],
          locals: [],
          templates: []
        };
      })();
      var child1 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 98,
                "column": 10
              },
              "end": {
                "line": 100,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/vertex/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            [");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("]\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "em-table-linked-cell", [], ["content", ["subexpr", "@mut", [["get", "lastTasksToFinish", ["loc", [null, [99, 44], [99, 61]]]]], [], []]], ["loc", [null, [99, 13], [99, 63]]]]],
          locals: [],
          templates: []
        };
      })();
      var child2 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 113,
                "column": 10
              },
              "end": {
                "line": 115,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/vertex/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            [");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("]\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "em-table-linked-cell", [], ["content", ["subexpr", "@mut", [["get", "shortestDurationTasks", ["loc", [null, [114, 44], [114, 65]]]]], [], []]], ["loc", [null, [114, 13], [114, 67]]]]],
          locals: [],
          templates: []
        };
      })();
      var child3 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 122,
                "column": 10
              },
              "end": {
                "line": 124,
                "column": 10
              }
            },
            "moduleName": "tez-ui/templates/vertex/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("            [");
            dom.appendChild(el0, el1);
            var el1 = dom.createComment("");
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("]\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
            return morphs;
          },
          statements: [["inline", "em-table-linked-cell", [], ["content", ["subexpr", "@mut", [["get", "longestDurationTasks", ["loc", [null, [123, 44], [123, 64]]]]], [], []]], ["loc", [null, [123, 13], [123, 66]]]]],
          locals: [],
          templates: []
        };
      })();
      var child4 = (function () {
        return {
          meta: {
            "fragmentReason": false,
            "revision": "Ember@2.2.0",
            "loc": {
              "source": null,
              "start": {
                "line": 130,
                "column": 2
              },
              "end": {
                "line": 139,
                "column": 2
              }
            },
            "moduleName": "tez-ui/templates/vertex/index.hbs"
          },
          isEmpty: false,
          arity: 0,
          cachedFragment: null,
          hasRendered: false,
          buildFragment: function buildFragment(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("    ");
            dom.appendChild(el0, el1);
            var el1 = dom.createElement("div");
            dom.setAttribute(el1, "class", "panel panel-danger");
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "panel-heading");
            var el3 = dom.createTextNode("\n        Diagnostics\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n      ");
            dom.appendChild(el1, el2);
            var el2 = dom.createElement("div");
            dom.setAttribute(el2, "class", "diagnostics");
            var el3 = dom.createTextNode("\n        ");
            dom.appendChild(el2, el3);
            var el3 = dom.createComment("");
            dom.appendChild(el2, el3);
            var el3 = dom.createTextNode("\n      ");
            dom.appendChild(el2, el3);
            dom.appendChild(el1, el2);
            var el2 = dom.createTextNode("\n    ");
            dom.appendChild(el1, el2);
            dom.appendChild(el0, el1);
            var el1 = dom.createTextNode("\n");
            dom.appendChild(el0, el1);
            return el0;
          },
          buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
            var morphs = new Array(1);
            morphs[0] = dom.createUnsafeMorphAt(dom.childAt(fragment, [1, 3]), 1, 1);
            return morphs;
          },
          statements: [["content", "model.diagnostics", ["loc", [null, [136, 8], [136, 31]]]]],
          locals: [],
          templates: []
        };
      })();
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 141,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Details");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Vertex ID");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Vertex Name");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Processor Class");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Status");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Progress");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Start Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("End Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("table");
          dom.setAttribute(el1, "class", "detail-list");
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("thead");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("th");
          dom.setAttribute(el4, "colspan", "2");
          var el5 = dom.createTextNode("Stats");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("tbody");
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Total Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Succeeded Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Failed Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Killed Tasks");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("First Task Start Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Last Task Finish Time");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Average Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Minimum Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n      ");
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("tr");
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("Maximum Duration");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n        ");
          dom.appendChild(el3, el4);
          var el4 = dom.createElement("td");
          var el5 = dom.createTextNode("\n          ");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("\n");
          dom.appendChild(el4, el5);
          var el5 = dom.createComment("");
          dom.appendChild(el4, el5);
          var el5 = dom.createTextNode("        ");
          dom.appendChild(el4, el5);
          dom.appendChild(el3, el4);
          var el4 = dom.createTextNode("\n      ");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createTextNode("\n    ");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n  ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n\n");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1, 3]);
          var element1 = dom.childAt(fragment, [3, 3]);
          var element2 = dom.childAt(element1, [9, 3]);
          var element3 = dom.childAt(element1, [11, 3]);
          var element4 = dom.childAt(element1, [15, 3]);
          var element5 = dom.childAt(element1, [17, 3]);
          var morphs = new Array(22);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 3]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 3]), 0, 0);
          morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 3]), 0, 0);
          morphs[3] = dom.createMorphAt(dom.childAt(element0, [7, 3]), 0, 0);
          morphs[4] = dom.createMorphAt(dom.childAt(element0, [9, 3]), 0, 0);
          morphs[5] = dom.createMorphAt(dom.childAt(element0, [11, 3]), 0, 0);
          morphs[6] = dom.createMorphAt(dom.childAt(element0, [13, 3]), 0, 0);
          morphs[7] = dom.createMorphAt(dom.childAt(element0, [15, 3]), 0, 0);
          morphs[8] = dom.createMorphAt(dom.childAt(element1, [1, 3]), 0, 0);
          morphs[9] = dom.createMorphAt(dom.childAt(element1, [3, 3]), 0, 0);
          morphs[10] = dom.createMorphAt(dom.childAt(element1, [5, 3]), 0, 0);
          morphs[11] = dom.createMorphAt(dom.childAt(element1, [7, 3]), 0, 0);
          morphs[12] = dom.createMorphAt(element2, 1, 1);
          morphs[13] = dom.createMorphAt(element2, 3, 3);
          morphs[14] = dom.createMorphAt(element3, 1, 1);
          morphs[15] = dom.createMorphAt(element3, 3, 3);
          morphs[16] = dom.createMorphAt(dom.childAt(element1, [13, 3]), 1, 1);
          morphs[17] = dom.createMorphAt(element4, 1, 1);
          morphs[18] = dom.createMorphAt(element4, 3, 3);
          morphs[19] = dom.createMorphAt(element5, 1, 1);
          morphs[20] = dom.createMorphAt(element5, 3, 3);
          morphs[21] = dom.createMorphAt(fragment, 5, 5, contextualElement);
          return morphs;
        },
        statements: [["content", "model.entityID", ["loc", [null, [29, 12], [29, 30]]]], ["content", "model.name", ["loc", [null, [33, 12], [33, 26]]]], ["content", "model.processorClassName", ["loc", [null, [37, 12], [37, 40]]]], ["inline", "em-table-status-cell", [], ["content", ["subexpr", "@mut", [["get", "model.finalStatus", ["loc", [null, [41, 43], [41, 60]]]]], [], []]], ["loc", [null, [41, 12], [41, 62]]]], ["inline", "em-table-progress-cell", [], ["content", ["subexpr", "@mut", [["get", "model.progress", ["loc", [null, [45, 45], [45, 59]]]]], [], []]], ["loc", [null, [45, 12], [45, 61]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.startTime", ["loc", [null, [49, 37], [49, 52]]]]], [], []]], ["loc", [null, [49, 12], [49, 54]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.endTime", ["loc", [null, [53, 37], [53, 50]]]]], [], []]], ["loc", [null, [53, 12], [53, 52]]]], ["inline", "txt", [["get", "model.duration", ["loc", [null, [57, 18], [57, 32]]]]], ["type", "duration"], ["loc", [null, [57, 12], [57, 50]]]], ["inline", "txt", [["get", "model.totalTasks", ["loc", [null, [71, 18], [71, 34]]]]], ["type", "number"], ["loc", [null, [71, 12], [71, 50]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "model.succeededTasks", ["loc", [null, [75, 31], [75, 51]]]]], [], []], "routeName", "vertex.tasks", "statsType", "SUCCEEDED"], ["loc", [null, [75, 12], [75, 100]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "model.failedTasks", ["loc", [null, [79, 31], [79, 48]]]]], [], []], "routeName", "vertex.tasks", "statsType", "FAILED"], ["loc", [null, [79, 12], [79, 94]]]], ["inline", "stats-link", [], ["value", ["subexpr", "@mut", [["get", "model.killedTasks", ["loc", [null, [83, 31], [83, 48]]]]], [], []], "routeName", "vertex.tasks", "statsType", "KILLED"], ["loc", [null, [83, 12], [83, 94]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.firstTaskStartTime", ["loc", [null, [88, 35], [88, 59]]]]], [], []]], ["loc", [null, [88, 10], [88, 61]]]], ["block", "if", [["get", "firstTasksToStart", ["loc", [null, [89, 16], [89, 33]]]]], [], 0, null, ["loc", [null, [89, 10], [91, 17]]]], ["inline", "date-formatter", [], ["content", ["subexpr", "@mut", [["get", "model.lastTaskFinishTime", ["loc", [null, [97, 35], [97, 59]]]]], [], []]], ["loc", [null, [97, 10], [97, 61]]]], ["block", "if", [["get", "lastTasksToFinish", ["loc", [null, [98, 16], [98, 33]]]]], [], 1, null, ["loc", [null, [98, 10], [100, 17]]]], ["inline", "txt", [["get", "model.avgDuration", ["loc", [null, [106, 16], [106, 33]]]]], ["type", "duration"], ["loc", [null, [106, 10], [106, 51]]]], ["inline", "txt", [["get", "model.minDuration", ["loc", [null, [112, 16], [112, 33]]]]], ["type", "duration"], ["loc", [null, [112, 10], [112, 51]]]], ["block", "if", [["get", "shortestDurationTasks", ["loc", [null, [113, 16], [113, 37]]]]], [], 2, null, ["loc", [null, [113, 10], [115, 17]]]], ["inline", "txt", [["get", "model.maxDuration", ["loc", [null, [121, 16], [121, 33]]]]], ["type", "duration"], ["loc", [null, [121, 10], [121, 51]]]], ["block", "if", [["get", "longestDurationTasks", ["loc", [null, [122, 16], [122, 36]]]]], [], 3, null, ["loc", [null, [122, 10], [124, 17]]]], ["block", "if", [["get", "model.diagnostics", ["loc", [null, [130, 8], [130, 25]]]]], [], 4, null, ["loc", [null, [130, 2], [139, 9]]]]],
        locals: [],
        templates: [child0, child1, child2, child3, child4]
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 141,
              "column": 0
            },
            "end": {
              "line": 143,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/index.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [142, 2], [142, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 144,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/vertex/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [143, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define("tez-ui/templates/vertex/tasks", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 19,
              "column": 0
            },
            "end": {
              "line": 35,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/tasks.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "em-table", [], ["columns", ["subexpr", "@mut", [["get", "visibleColumns", ["loc", [null, [21, 12], [21, 26]]]]], [], []], "rows", ["subexpr", "@mut", [["get", "model", ["loc", [null, [22, 9], [22, 14]]]]], [], []], "headerComponentNames", ["subexpr", "@mut", [["get", "headerComponentNames", ["loc", [null, [24, 25], [24, 45]]]]], [], []], "definition", ["subexpr", "@mut", [["get", "definition", ["loc", [null, [26, 15], [26, 25]]]]], [], []], "searchAction", "searchChanged", "sortAction", "sortChanged", "rowAction", "rowCountChanged", "pageAction", "pageChanged", "rowsChanged", "rowsChanged"], ["loc", [null, [20, 2], [34, 4]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.2.0",
          "loc": {
            "source": null,
            "start": {
              "line": 35,
              "column": 0
            },
            "end": {
              "line": 37,
              "column": 0
            }
          },
          "moduleName": "tez-ui/templates/vertex/tasks.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("  ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
          return morphs;
        },
        statements: [["inline", "partial", ["loading"], [], ["loc", [null, [36, 2], [36, 23]]]]],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.2.0",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 38,
            "column": 0
          }
        },
        "moduleName": "tez-ui/templates/vertex/tasks.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 1, 1, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["block", "if", [["get", "loaded", ["loc", [null, [19, 6], [19, 12]]]]], [], 0, 1, ["loc", [null, [19, 0], [37, 7]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
define('tez-ui/transforms/object', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Transform.extend({
    deserialize: function deserialize(serialized) {
      return serialized;
    },

    serialize: function serialize(deserialized) {
      return deserialized;
    }
  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/utils/column-definition', ['exports', 'em-table/utils/column-definition'], function (exports, _emTableUtilsColumnDefinition) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableUtilsColumnDefinition['default'];
    }
  });
});
define('tez-ui/utils/counter-column-definition', ['exports', 'ember', 'tez-ui/utils/misc', 'em-table/utils/column-definition'], function (exports, _ember, _tezUiUtilsMisc, _emTableUtilsColumnDefinition) {

  /*
   * Returns a counter value from for a row
   * @param row
   * @return value
   */
  function getCounterContent(row) {
    var counter = _ember['default'].get(row, this.get("contentPath"));

    if (counter) {
      counter = counter[this.get("counterGroupName")];
      if (counter) {
        return counter[this.get("counterName")] || null;
      }
      return null;
    }
  }

  var CounterColumnDefinition = _emTableUtilsColumnDefinition['default'].extend({
    counterName: "",
    counterGroupName: "",

    observePath: true,
    contentPath: "counterGroupsHash",

    getCellContent: getCounterContent,
    getSearchValue: getCounterContent,
    getSortValue: getCounterContent,

    id: _ember['default'].computed("counterName", "counterGroupName", function () {
      var groupName = this.get("counterGroupName"),
          counterName = this.get("counterName");
      return groupName + '/' + counterName;
    }),

    groupDisplayName: _ember['default'].computed("counterGroupName", function () {
      var displayName = this.get("counterGroupName");

      // Prune dotted path
      displayName = displayName.substr(displayName.lastIndexOf('.') + 1);

      if ((0, _tezUiUtilsMisc['default'])(displayName)) {
        displayName = displayName.replace("_INPUT_", " to Input-");
        displayName = displayName.replace("_OUTPUT_", " to Output-");
      }

      // Prune counter text
      displayName = displayName.replace("Counter_", " - ");
      displayName = displayName.replace("Counter", "");

      return displayName;
    }),

    headerTitle: _ember['default'].computed("groupDisplayName", "counterName", function () {
      var groupName = this.get("groupDisplayName"),
          counterName = this.get("counterName");
      return groupName + ' - ' + counterName;
    })
  });

  CounterColumnDefinition.make = function (rawDefinition) {
    if (Array.isArray(rawDefinition)) {
      return rawDefinition.map(function (def) {
        return CounterColumnDefinition.create(def);
      });
    } else if (typeof rawDefinition === 'object') {
      return CounterColumnDefinition.create(rawDefinition);
    } else {
      throw new Error("rawDefinition must be an Array or an Object.");
    }
  };

  exports['default'] = CounterColumnDefinition;
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define('tez-ui/utils/data-processor', ['exports', 'em-tgraph/utils/data-processor'], function (exports, _emTgraphUtilsDataProcessor) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTgraphUtilsDataProcessor['default'];
    }
  });
});
define('tez-ui/utils/download-dag-zip', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {
  exports['default'] = downloadDagZip;

  zip.workerScriptsPath = "assets/zip/";

  var IO = {
    /* Allow queuing of downloads and then get a callback once all the downloads are done.
     * sample usage.
     * var downloader = IO.fileDownloader();
     * downloader.queueItem({
     *   url: 'http://....',
     *   onItemFetched: function(data, context) {...},
     *   context: {}, // context object gets passed back to the callback
     * });
     * downloader.queueItem({...}); //queue in other items
     * downloader.finish(); // once all items are queued. items can be queued from
     *                      // callbacks too. in that case the finish should be called
     *                      // once all items are queued.
     * downloader.then(successCallback).catch(failurecallback).finally(callback)
     */
    fileDownloader: function fileDownloader(options) {
      var itemList = [],
          opts = options || {},
          numParallel = opts.numParallel || 5,
          hasMoreInputs = true,
          inProgress = 0,
          hasFailed = false,
          pendingRequests = {},
          pendingRequestID = 0,
          failureReason = 'Unknown',
          deferredPromise = _ember['default'].RSVP.defer();

      function checkForCompletion() {
        if (hasFailed) {
          if (inProgress === 0) {
            deferredPromise.reject("Unknown Error");
          }
          return;
        }

        if (hasMoreInputs || itemList.length > 0 || inProgress > 0) {
          return;
        }

        deferredPromise.resolve();
      }

      function getRequestId() {
        return "req_" + pendingRequestID++;
      }

      function abortPendingRequests() {
        _ember['default'].$.each(pendingRequests, function (idx, val) {
          try {
            val.abort("abort");
          } catch (e) {}
        });
      }

      function markFailed(reason) {
        if (!hasFailed) {
          hasFailed = true;
          failureReason = reason;
          abortPendingRequests();
        }
      }

      function processNext() {
        if (inProgress >= numParallel) {
          _ember['default'].Logger.debug('delaying download as ' + inProgress + ' of ' + numParallel + ' is in progress');
          return;
        }

        if (itemList.length < 1) {
          _ember['default'].Logger.debug("no items to download");
          checkForCompletion();
          return;
        }

        inProgress++;
        _ember['default'].Logger.debug('starting download ' + inProgress);
        var item = itemList.shift();

        var xhr = _ember['default'].$.ajax({
          crossOrigin: true,
          url: item.url,
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          }
        });
        var reqID = getRequestId();
        pendingRequests[reqID] = xhr;

        xhr.done(function (data /*, statusText, xhr*/) {
          delete pendingRequests[reqID];

          if (_ember['default'].$.isFunction(item.onItemFetched)) {
            try {
              item.onItemFetched(data, item.context);
            } catch (e) {
              markFailed(e || 'failed to process data');
              inProgress--;
              checkForCompletion();
              return;
            }
          }

          inProgress--;
          processNext();
        }).fail(function (xhr, statusText /*, errorObject*/) {
          delete pendingRequests[reqID];
          markFailed(statusText);
          inProgress--;
          checkForCompletion();
        });
      }

      return _emberData['default'].PromiseObject.create({
        promise: deferredPromise.promise,

        queueItems: function queueItems(options) {
          options.forEach(this.queueItem);
        },

        queueItem: function queueItem(option) {
          itemList.push(option);
          processNext();
        },

        finish: function finish() {
          hasMoreInputs = false;
          checkForCompletion();
        },

        cancel: function cancel() {
          markFailed("User cancelled");
          checkForCompletion();
        }
      });
    },

    /*
     * allows to zip files and download that.
     * usage:
     * zipHelper = IO.zipHelper({
     *   onProgress: function(filename, current, total) { ...},
     *   onAdd: function(filename) {...}
     * });
     * zipHelper.addFile({name: filenameinsidezip, data: data);
     * // add all files
     * once all files are added call the close
     * zipHelper.close(); // or .abort to abort zip
     * zipHelper.then(function(zippedBlob) {
     *   saveAs(filename, zippedBlob);
     * }).catch(failureCallback);
     */
    zipHelper: function zipHelper(options) {
      var opts = options || {},
          zipWriter,
          completion = _ember['default'].RSVP.defer(),
          fileList = [],
          completed = 0,
          currentIdx = -1,
          numFiles = 0,
          hasMoreInputs = true,
          inProgress = false,
          hasFailed = false;

      zip.createWriter(new zip.BlobWriter("application/zip"), function (writer) {
        zipWriter = writer;
        checkForCompletion();
        nextFile();
      });

      function checkForCompletion() {
        if (hasFailed) {
          if (zipWriter) {
            _ember['default'].Logger.debug("aborting zipping. closing file.");
            zipWriter.close(completion.reject);
            zipWriter = null;
          }
        } else {
          if (!hasMoreInputs && numFiles === completed) {
            _ember['default'].Logger.debug("completed zipping. closing file.");
            zipWriter.close(completion.resolve);
          }
        }
      }

      function onProgress(current, total) {
        if (_ember['default'].$.isFunction(opts.onProgress)) {
          opts.onProgress(fileList[currentIdx].name, current, total);
        }
      }

      function onAdd(filename) {
        if (_ember['default'].$.isFunction(opts.onAdd)) {
          opts.onAdd(filename);
        }
      }

      function nextFile() {
        if (hasFailed || completed === numFiles || inProgress) {
          return;
        }

        currentIdx++;
        var file = fileList[currentIdx];
        inProgress = true;
        onAdd(file.name);
        zipWriter.add(file.name, new zip.TextReader(file.data), function () {
          completed++;
          inProgress = false;
          if (currentIdx < numFiles - 1) {
            nextFile();
          }
          checkForCompletion();
        }, onProgress);
      }

      return _emberData['default'].PromiseObject.create({
        addFiles: function addFiles(files) {
          files.forEach(this.addFile);
        },

        addFile: function addFile(file) {
          if (hasFailed) {
            _ember['default'].Logger.debug('Skipping add of file ' + file.name + ' as zip has been aborted');
            return;
          }
          numFiles++;
          fileList.push(file);
          if (zipWriter) {
            _ember['default'].Logger.debug("adding file from addFile: " + file.name);
            nextFile();
          }
        },

        close: function close() {
          hasMoreInputs = false;
          checkForCompletion();
        },

        promise: completion.promise,

        abort: function abort() {
          hasFailed = true;
          this.close();
        }
      });
    }
  };

  function downloadDagZip(dag, options) {
    var opts = options || {},
        batchSize = opts.batchSize || 1000,
        dagID = dag.get("entityID"),
        baseurl = options.timelineHost + '/' + options.timelineNamespace,
        itemsToDownload = [{
      url: getUrl('TEZ_APPLICATION', 'tez_' + dag.get("appID")),
      context: { name: 'application', type: 'TEZ_APPLICATION' },
      onItemFetched: processSingleItem
    }, {
      url: getUrl('TEZ_DAG_ID', dagID),
      context: { name: 'dag', type: 'TEZ_DAG_ID' },
      onItemFetched: processSingleItem
    }, {
      url: getUrl('TEZ_VERTEX_ID', dagID),
      context: { name: 'vertices', type: 'TEZ_VERTEX_ID', part: 0 },
      onItemFetched: processMultipleItems
    }, {
      url: getUrl('TEZ_TASK_ID', dagID),
      context: { name: 'tasks', type: 'TEZ_TASK_ID', part: 0 },
      onItemFetched: processMultipleItems
    }, {
      url: getUrl('TEZ_TASK_ATTEMPT_ID', dagID),
      context: { name: 'task_attempts', type: 'TEZ_TASK_ATTEMPT_ID', part: 0 },
      onItemFetched: processMultipleItems
    }],
        totalItemsToDownload = itemsToDownload.length,
        numItemTypesToDownload = totalItemsToDownload,
        downloader = IO.fileDownloader(),
        zipHelper = IO.zipHelper({
      onProgress: function onProgress(filename, current, total) {
        _ember['default'].Logger.debug(filename + ': ' + current + ' of ' + total);
      },
      onAdd: function onAdd(filename) {
        _ember['default'].Logger.debug('adding ' + filename + ' to Zip');
      }
    }),
        downloaderProxy = _ember['default'].Object.create({
      percent: 0,
      succeeded: false,
      failed: false,
      cancel: function cancel() {
        downloader.cancel();
      }
    });

    function getUrl(type, dagID, fromID) {
      var url,
          queryBatchSize = batchSize + 1;

      if (type === 'TEZ_DAG_ID' || type === 'TEZ_APPLICATION') {
        url = baseurl + '/' + type + '/' + dagID;
      } else {
        url = baseurl + '/' + type + '?primaryFilter=TEZ_DAG_ID:' + dagID + '&limit=' + queryBatchSize;
        if (!!fromID) {
          url = url + '&fromId=' + fromID;
        }
      }
      return url;
    }

    function checkIfAllDownloaded() {
      numItemTypesToDownload--;

      var remainingItems = totalItemsToDownload - numItemTypesToDownload;
      downloaderProxy.set("percent", remainingItems / totalItemsToDownload);

      if (numItemTypesToDownload === 0) {
        downloader.finish();
      }
    }

    function processSingleItem(data, context) {
      var obj = {};
      obj[context.name] = data;

      zipHelper.addFile({ name: context.name + '.json', data: JSON.stringify(obj, null, 2) });
      checkIfAllDownloaded();
    }

    function processMultipleItems(data, context) {
      var obj = {};
      var nextBatchStart;

      if (!_ember['default'].$.isArray(data.entities)) {
        throw "invalid data";
      }

      // need to handle no more entries , zero entries
      if (data.entities.length > batchSize) {
        nextBatchStart = data.entities.pop().entity;
      }
      obj[context.name] = data.entities;

      zipHelper.addFile({ name: context.name + '_part_' + context.part + '.json', data: JSON.stringify(obj, null, 2) });

      if (!!nextBatchStart) {
        context.part++;
        downloader.queueItem({
          url: getUrl(context.type, dagID, nextBatchStart),
          context: context,
          onItemFetched: processMultipleItems
        });
      } else {
        checkIfAllDownloaded();
      }
    }

    downloader.queueItems(itemsToDownload);

    downloader.then(function () {
      _ember['default'].Logger.info('Finished download');
      zipHelper.close();
    })['catch'](function (e) {
      _ember['default'].Logger.error('Failed to download: ' + e);
      zipHelper.abort();
    });

    zipHelper.then(function (zippedBlob) {
      saveAs(zippedBlob, dagID + '.zip');
      downloaderProxy.set("succeeded", true);
    }, function () {
      _ember['default'].Logger.error('zip Failed');
      downloaderProxy.set("failed", true);
    });

    return downloaderProxy;
  }
});
/*global zip, saveAs*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
define('tez-ui/utils/formatters', ['exports', 'em-helpers/utils/formatters'], function (exports, _emHelpersUtilsFormatters) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emHelpersUtilsFormatters['default'];
    }
  });
});
define('tez-ui/utils/fullscreen', ['exports', 'em-tgraph/utils/fullscreen'], function (exports, _emTgraphUtilsFullscreen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTgraphUtilsFullscreen['default'];
    }
  });
});
define('tez-ui/utils/graph-view', ['exports', 'em-tgraph/utils/graph-view'], function (exports, _emTgraphUtilsGraphView) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTgraphUtilsGraphView['default'];
    }
  });
});
define('tez-ui/utils/misc', ['exports'], function (exports) {
  exports['default'] = isIOCounter;
  /**
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  function isIOCounter(name) {
    name = name.split('/')[0];
    name = name.substr(name.indexOf('_') + 1);
    return !!(name.match('_INPUT_') || name.match('_OUTPUT_'));
  }
});
define('tez-ui/utils/process-definition', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Object.extend({});
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
define("tez-ui/utils/process", ["exports", "ember"], function (exports, _ember) {

  var processIndex = 1;

  exports["default"] = _ember["default"].Object.extend({
    _id: null,

    name: null,
    events: [], // An array of objects with name and time as mandatory(else error) properties.
    eventBars: null,

    index: 0,
    color: null,

    blockers: null, // Array of processes that's blocking the current process
    blocking: null, // Array of processes blocked by the current process

    blockingEventName: null,

    consolidateStartTime: _ember["default"].computed.oneWay("startEvent.time"),
    consolidateEndTime: _ember["default"].computed.oneWay("endEvent.time"),

    init: function init() {
      this.set("_id", "process-id-" + processIndex);
      processIndex++;
    },

    getColor: function getColor(lightnessFactor) {
      var color = this.get("color"),
          l;

      if (!color) {
        return "#0";
      }
      l = color.l;
      if (lightnessFactor !== undefined) {
        l += 5 + 25 * lightnessFactor;
      }
      return "hsl( " + color.h + ", " + color.s + "%, " + l + "% )";
    },

    getBarColor: function getBarColor(barIndex) {
      return this.getColor(1 - barIndex / this.get("eventBars.length"));
    },

    getConsolidateColor: function getConsolidateColor() {
      return this.getColor();
    },

    startEvent: _ember["default"].computed("events.@each.time", function () {
      var events = this.get("events"),
          startEvent;
      if (events) {
        startEvent = events[0];
        events.forEach(function (event) {
          if (startEvent.time > event.time) {
            startEvent = event;
          }
        });
      }
      return startEvent;
    }),

    endEvent: _ember["default"].computed("events.@each.time", function () {
      var events = this.get("events"),
          endEvent;
      if (events) {
        endEvent = events[events.length - 1];
        events.forEach(function (event) {
          if (endEvent.time < event.time) {
            endEvent = event;
          }
        });
      }
      return endEvent;
    }),

    getAllBlockers: function getAllBlockers(parentHash) {
      var blockers = [],
          currentId = this.get("_id");

      parentHash = parentHash || {}; // To keep a check on cyclic blockers

      parentHash[currentId] = true;
      if (this.get("blockers.length")) {
        this.get("blockers").forEach(function (blocker) {
          if (!parentHash[blocker.get("_id")]) {
            blockers.push(blocker);
            blockers.push.apply(blockers, blocker.getAllBlockers(parentHash));
          }
        });
      }
      parentHash[currentId] = false;

      return blockers;
    },

    getTooltipContents: function getTooltipContents(type /*, options*/) {
      return [{
        title: this.get("name"),
        description: "Mouse on : " + type
      }];
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
define("tez-ui/utils/processor", ["exports", "ember"], function (exports, _ember) {

  function getVibrantHSL(colorNum, totalColors) {
    if (totalColors < 1) {
      totalColors = 1;
    }
    return {
      h: colorNum * (360 / totalColors) % 360,
      s: 100 - colorNum % 2 * 30,
      l: 40
    };
  }

  exports["default"] = _ember["default"].Object.extend({

    processCount: 0,

    startTime: 0,
    endTime: 0,

    timeWindow: _ember["default"].computed("startTime", "endTime", function () {
      return Math.max(0, this.get("endTime") - this.get("startTime"));
    }),

    createProcessColor: function createProcessColor(index, totalProcessCount) {
      return getVibrantHSL(index, totalProcessCount || this.get("processCount"));
    },

    timeToPositionPercent: function timeToPositionPercent(time) {
      return (time - this.get("startTime")) / this.get("timeWindow") * 100;
    }

  });
});
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
define('tez-ui/utils/table-definition', ['exports', 'em-table/utils/table-definition'], function (exports, _emTableUtilsTableDefinition) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTableUtilsTableDefinition['default'];
    }
  });
});
define('tez-ui/utils/tip', ['exports', 'em-tgraph/utils/tip'], function (exports, _emTgraphUtilsTip) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emTgraphUtilsTip['default'];
    }
  });
});
define('tez-ui/utils/vertex-process', ['exports', 'ember', 'tez-ui/utils/process'], function (exports, _ember, _tezUiUtilsProcess) {

  var MoreObject = more.Object;

  exports['default'] = _tezUiUtilsProcess['default'].extend({
    vertex: null,

    name: _ember['default'].computed.oneWay("vertex.name"),
    completeTime: _ember['default'].computed.oneWay("vertex.endTime"),

    blockingEventName: "VERTEX_FINISHED",

    getVisibleProps: null,

    edgeHash: null,

    eventBars: [{
      fromEvent: "FIRST_TASK_STARTED",
      toEvent: "LAST_TASK_FINISHED"
    }, {
      fromEvent: "DEPENDENT_VERTICES_COMPLETE",
      toEvent: "LAST_TASK_FINISHED"
    }],

    init: function init() {
      this._super();
      this.set("edgeHash", _ember['default'].Object.create());
    },

    eventsHash: _ember['default'].computed("vertex.events.@each.timestamp", function () {
      var events = {},
          eventsArr = this.get("vertex.events");

      if (eventsArr) {
        eventsArr.forEach(function (event) {
          if (event.timestamp > 0) {
            events[event.eventtype] = {
              name: event.eventtype,
              time: event.timestamp,
              info: event.eventinfo
            };
          }
        });
      }

      return events;
    }),

    events: _ember['default'].computed("eventsHash", "vertex.initTime", "vertex.startTime", "vertex.endTime", "vertex.firstTaskStartTime", "vertex.lastTaskFinishTime", "unblockDetails", function () {
      var events = [],
          eventsHash = this.get("eventsHash"),
          initTime = this.get("vertex.initTime"),
          startTime = this.get("vertex.startTime"),
          endTime = this.get("vertex.endTime"),
          firstTaskStartTime = this.get("vertex.firstTaskStartTime"),
          lastTaskFinishTime = this.get("vertex.lastTaskFinishTime"),
          unblockDetails = this.get("unblockDetails");

      if (initTime > 0) {
        eventsHash["VERTEX_INITIALIZED"] = {
          name: "VERTEX_INITIALIZED",
          time: initTime
        };
      }

      if (startTime > 0) {
        eventsHash["VERTEX_STARTED"] = {
          name: "VERTEX_STARTED",
          time: startTime
        };
      }

      if (firstTaskStartTime > 0) {
        eventsHash["FIRST_TASK_STARTED"] = {
          name: "FIRST_TASK_STARTED",
          time: firstTaskStartTime
        };
      }

      if (unblockDetails && unblockDetails.time >= firstTaskStartTime) {
        eventsHash["DEPENDENT_VERTICES_COMPLETE"] = {
          name: "DEPENDENT_VERTICES_COMPLETE",
          time: unblockDetails.time,
          edge: unblockDetails.edge
        };
      }

      if (lastTaskFinishTime > 0) {
        eventsHash["LAST_TASK_FINISHED"] = {
          name: "LAST_TASK_FINISHED",
          time: lastTaskFinishTime
        };
      }

      if (endTime > 0) {
        eventsHash["VERTEX_FINISHED"] = {
          name: "VERTEX_FINISHED",
          time: endTime
        };
      }

      MoreObject.forEach(eventsHash, function (key, value) {
        events.push(value);
      });

      return events;
    }),

    unblockDetails: _ember['default'].computed("blockers.@each.completeTime", function () {
      var blockers = this.get("blockers"),
          data = {
        time: 0
      };

      if (blockers) {
        blockers.every(function (currentBlocker) {
          var blockerComplete = currentBlocker.get("completeTime");

          if (!blockerComplete) {
            this.blocker = undefined;
            return false;
          } else if (blockerComplete > this.time) {
            this.blocker = currentBlocker;
            this.time = blockerComplete;
          }

          return true;
        }, data);
      }

      if (data.blocker) {
        return {
          time: data.blocker.get("completeTime"),
          edge: this.get("edgeHash").get(data.blocker.get("name"))
        };
      }
    }),

    getTipProperties: function getTipProperties(propHash, propArray) {
      propArray = propArray || [];

      MoreObject.forEach(propHash, function (key, value) {
        if (MoreObject.isString(value)) {
          propArray.push({
            name: key,
            value: value
          });
        } else if (MoreObject.isNumber(value)) {
          propArray.push({
            name: key,
            value: value,
            type: "number"
          });
        }
      });

      return propArray;
    },

    getTooltipContents: function getTooltipContents(type, options) {
      var contents,
          that = this,
          vertexDescription;

      switch (type) {
        case "consolidated-process":
          vertexDescription = 'Contribution ' + options.contribution + '%';
        /* falls through */
        case "process-name":
          var properties = this.getVisibleProps().map(function (definition) {
            return {
              name: definition.get("headerTitle"),
              value: that.get("vertex").get(definition.get("contentPath")),
              type: _ember['default'].get(definition, "cellDefinition.type"),
              format: _ember['default'].get(definition, "cellDefinition.format")
            };
          });

          contents = [{
            title: this.get("name"),
            properties: properties,
            description: vertexDescription
          }];
          break;
        case "event-bar":
        case "process-line":
          contents = [{
            title: this.get("name")
          }];
          break;
        case "event":
          var edge;
          contents = options.events.map(function (event) {
            var properties = [{
              name: "Time",
              value: event.time,
              type: "date"
            }];

            if (event.edge) {
              edge = event.edge;
            }
            if (event.info) {
              properties = this.getTipProperties(event.info, properties);
            }

            return {
              title: event.name,
              properties: properties
            };
          }, this);

          if (edge) {
            var sourceClass = edge.edgeSourceClass || "",
                destClass = edge.edgeDestinationClass || "";

            contents.push({
              title: "Edge From Final Dependent Vertex",
              properties: this.getTipProperties({
                "Input Vertex": edge.inputVertexName,
                "Output Vertex": edge.outputVertexName,
                "Data Movement": edge.dataMovementType,
                "Data Source": edge.dataSourceType,
                "Scheduling": edge.schedulingType,
                "Source Class": sourceClass.substr(sourceClass.lastIndexOf(".") + 1),
                "Destination Class": destClass.substr(destClass.lastIndexOf(".") + 1)
              })
            });
          }
          break;
      }

      return contents;
    },

    consolidateStartTime: _ember['default'].computed("vertex.firstTaskStartTime", "unblockDetails.time", function () {
      return Math.max(this.get("vertex.firstTaskStartTime") || 0, this.get("unblockDetails.time") || 0);
    }),
    consolidateEndTime: _ember['default'].computed.oneWay("vertex.endTime"),

    getConsolidateColor: function getConsolidateColor() {
      return this.getBarColor(this.get("unblockDetails") ? 1 : 0);
    }

  });
});
/*global more*/
/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements. See the NOTICE file distributed with this
 * work for additional information regarding copyright ownership. The ASF
 * licenses this file to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('tez-ui/config/environment', ['ember'], function(Ember) {
  return { 'default': {"modulePrefix":"tez-ui","environment":"production","locationType":"hash","EmberENV":{"FEATURES":{}},"APP":{"buildVersion":"0.8.4","isStandalone":true,"rowLoadLimit":9007199254740991,"pollingInterval":3000,"hosts":{"timeline":"localhost:8188","rm":"localhost:8088"},"namespaces":{"webService":{"timeline":"ws/v1/timeline","appHistory":"ws/v1/applicationhistory","rm":"ws/v1/cluster","am":"proxy/{app_id}/ws/v2/tez"},"web":{"rm":"cluster"}},"paths":{"timeline":{"dag":"TEZ_DAG_ID","vertex":"TEZ_VERTEX_ID","task":"TEZ_TASK_ID","attempt":"TEZ_TASK_ATTEMPT_ID","hiveQuery":"HIVE_QUERY_ID","app":"TEZ_APPLICATION"},"am":{"dag-am":"dagInfo","vertex-am":"verticesInfo","task-am":"tasksInfo","attempt-am":"attemptsInfo"},"rm":{"app-rm":"apps"}},"hrefs":{"help":"https://tez.apache.org/tez_ui_user_data.html","license":"http://www.apache.org/licenses/LICENSE-2.0"},"tables":{"defaultColumns":{"counters":[{"counterName":"FILE_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_LARGE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_WRITE_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_LARGE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_WRITE_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"NUM_SPECULATIONS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"REDUCE_INPUT_GROUPS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"REDUCE_INPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SPLIT_RAW_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"COMBINE_INPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SPILLED_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_SHUFFLED_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_SKIPPED_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_FAILED_SHUFFLE_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"MERGED_MAP_OUTPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"GC_TIME_MILLIS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"CPU_MILLISECONDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"PHYSICAL_MEMORY_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"VIRTUAL_MEMORY_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"COMMITTED_HEAP_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"INPUT_RECORDS_PROCESSED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_LARGE_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES_WITH_OVERHEAD","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES_PHYSICAL","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILLS_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILLS_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILL_COUNT","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_DECOMPRESSED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_TO_MEM","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_TO_DISK","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_DISK_DIRECT","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_MEM_TO_DISK_MERGES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_DISK_TO_DISK_MERGES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_PHASE_TIME","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"MERGE_PHASE_TIME","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"FIRST_EVENT_RECEIVED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"LAST_EVENT_RECEIVED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"}],"dagCounters":[{"counterName":"NUM_FAILED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_KILLED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_SUCCEEDED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"TOTAL_LAUNCHED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"OTHER_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"DATA_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"RACK_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"SLOTS_MILLIS_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"FALLOW_SLOTS_MILLIS_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"TOTAL_LAUNCHED_UBERTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_UBER_SUBTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_FAILED_UBERTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"REDUCE_OUTPUT_RECORDS","counterGroupName":"REDUCE_OUTPUT_RECORDS"},{"counterName":"REDUCE_SKIPPED_GROUPS","counterGroupName":"REDUCE_SKIPPED_GROUPS"},{"counterName":"REDUCE_SKIPPED_RECORDS","counterGroupName":"REDUCE_SKIPPED_RECORDS"},{"counterName":"COMBINE_OUTPUT_RECORDS","counterGroupName":"COMBINE_OUTPUT_RECORDS"},{"counterName":"SKIPPED_RECORDS","counterGroupName":"SKIPPED_RECORDS"},{"counterName":"INPUT_GROUPS","counterGroupName":"INPUT_GROUPS"}]}},"name":"tez-ui","version":"0.2.0+f9b0f72a"},"contentSecurityPolicy":{"connect-src":"* 'self'","child-src":"'self' 'unsafe-inline'","style-src":"'self' 'unsafe-inline'","script-src":"'self' 'unsafe-inline'","default-src":"'none'","font-src":"'self'","img-src":"'self'","media-src":"'self'"},"contentSecurityPolicyHeader":"Content-Security-Policy-Report-Only","exportApplicationGlobal":false,"moment":{"includeTimezone":"2010-2020"}}};
});

if (!runningTests) {
  require("tez-ui/app")["default"].create({"buildVersion":"0.8.4","isStandalone":true,"rowLoadLimit":9007199254740991,"pollingInterval":3000,"hosts":{"timeline":"localhost:8188","rm":"localhost:8088"},"namespaces":{"webService":{"timeline":"ws/v1/timeline","appHistory":"ws/v1/applicationhistory","rm":"ws/v1/cluster","am":"proxy/{app_id}/ws/v2/tez"},"web":{"rm":"cluster"}},"paths":{"timeline":{"dag":"TEZ_DAG_ID","vertex":"TEZ_VERTEX_ID","task":"TEZ_TASK_ID","attempt":"TEZ_TASK_ATTEMPT_ID","hiveQuery":"HIVE_QUERY_ID","app":"TEZ_APPLICATION"},"am":{"dag-am":"dagInfo","vertex-am":"verticesInfo","task-am":"tasksInfo","attempt-am":"attemptsInfo"},"rm":{"app-rm":"apps"}},"hrefs":{"help":"https://tez.apache.org/tez_ui_user_data.html","license":"http://www.apache.org/licenses/LICENSE-2.0"},"tables":{"defaultColumns":{"counters":[{"counterName":"FILE_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_LARGE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"FILE_WRITE_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_LARGE_READ_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"HDFS_WRITE_OPS","counterGroupName":"org.apache.tez.common.counters.FileSystemCounter"},{"counterName":"NUM_SPECULATIONS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"REDUCE_INPUT_GROUPS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"REDUCE_INPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SPLIT_RAW_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"COMBINE_INPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SPILLED_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_SHUFFLED_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_SKIPPED_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_FAILED_SHUFFLE_INPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"MERGED_MAP_OUTPUTS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"GC_TIME_MILLIS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"CPU_MILLISECONDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"PHYSICAL_MEMORY_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"VIRTUAL_MEMORY_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"COMMITTED_HEAP_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"INPUT_RECORDS_PROCESSED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_LARGE_RECORDS","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES_WITH_OVERHEAD","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"OUTPUT_BYTES_PHYSICAL","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILLS_BYTES_WRITTEN","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILLS_BYTES_READ","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"ADDITIONAL_SPILL_COUNT","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_DECOMPRESSED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_TO_MEM","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_TO_DISK","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_BYTES_DISK_DIRECT","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_MEM_TO_DISK_MERGES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"NUM_DISK_TO_DISK_MERGES","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"SHUFFLE_PHASE_TIME","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"MERGE_PHASE_TIME","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"FIRST_EVENT_RECEIVED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"},{"counterName":"LAST_EVENT_RECEIVED","counterGroupName":"org.apache.tez.common.counters.TaskCounter"}],"dagCounters":[{"counterName":"NUM_FAILED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_KILLED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_SUCCEEDED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"TOTAL_LAUNCHED_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"OTHER_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"DATA_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"RACK_LOCAL_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"SLOTS_MILLIS_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"FALLOW_SLOTS_MILLIS_TASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"TOTAL_LAUNCHED_UBERTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_UBER_SUBTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"NUM_FAILED_UBERTASKS","counterGroupName":"org.apache.tez.common.counters.DAGCounter"},{"counterName":"REDUCE_OUTPUT_RECORDS","counterGroupName":"REDUCE_OUTPUT_RECORDS"},{"counterName":"REDUCE_SKIPPED_GROUPS","counterGroupName":"REDUCE_SKIPPED_GROUPS"},{"counterName":"REDUCE_SKIPPED_RECORDS","counterGroupName":"REDUCE_SKIPPED_RECORDS"},{"counterName":"COMBINE_OUTPUT_RECORDS","counterGroupName":"COMBINE_OUTPUT_RECORDS"},{"counterName":"SKIPPED_RECORDS","counterGroupName":"SKIPPED_RECORDS"},{"counterName":"INPUT_GROUPS","counterGroupName":"INPUT_GROUPS"}]}},"name":"tez-ui","version":"0.2.0+f9b0f72a"});
}

/* jshint ignore:end */
