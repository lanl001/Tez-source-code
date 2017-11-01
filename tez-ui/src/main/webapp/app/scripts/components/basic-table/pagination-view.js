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

App.BasicTableComponent.PaginationView = Ember.View.extend({
  templateName: 'components/basic-table/pagination-view',

  classNames: ['pagination-view'],

  atFirst: function () {
    return this.get('pageNum') == 1;
  }.property('pageNum'),

  atLast: function () {
    return this.get('pageNum') == this.get('totalPages');
  }.property('pageNum', 'totalPages'),

  _possiblePages: function () {
    var pageNum = this.get('pageNum'),
        totalPages = this.get('totalPages'),
        possiblePages = [],
        startPage = 1,
        endPage = totalPages,
        delta = 0;

    if(totalPages > 5) {
      startPage = pageNum - 2, endPage = pageNum + 2;

      if(startPage < 1) {
        delta = 1 - startPage;
      }
      else if(endPage > totalPages) {
        delta = totalPages - endPage;
      }

      startPage += delta, endPage += delta;
    }

    while(startPage <= endPage) {
      possiblePages.push({
        isCurrent: startPage == pageNum,
        pageNum: startPage++
      });
    }

    return possiblePages;
  }.property('pageNum', 'totalPages'),
});