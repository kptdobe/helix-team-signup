/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/**
 * The 'pre' function that is executed before the HTML is rendered
 * @param payload The current payload of processing pipeline
 * @param payload.content The content
 */

var toHAST = require('mdast-util-to-hast');
var toHTML = require('hast-util-to-html');



function pre(payload) {  
  var sections = payload.content.sections;
  var bgImg = payload.content.backgroundImage = sections[0];
  payload.content.backgroundImage.url = bgImg.image;
  payload.content.headerSection = sections[1];  
  payload.content.bodySections = sections.slice(2);
  for(var s in payload.content.bodySections) {
    var bSec = payload.content.bodySections[s];
    bSec.html = toHTML(toHAST(bSec));
    
    // HACK: add form based on title
    if (bSec.title == "Ready to join?") {
      bSec.html += '<form method="POST" action="https://script.google.com/macros/s/AKfycbx0U_xOIUXd4LGLL_fNWFXWh96ZIkOiEM7yWk6Do_ustrFvRCs1/exec"><input type="text" name="Name" placeholder="Name"/><input type="text" name="GitHub-Profile" placeholder="GitHub-Profile"/><input type="submit" /></form>';
    }
  }
  payload.content.time = `${new Date()}`;
}

module.exports.pre = pre;
