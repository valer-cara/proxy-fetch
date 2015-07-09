var cheerio = require('cheerio'),
    http = require('http'),
    _ = require('underscore');

var fieldIndexes = {
  ip: 0,
  port: 1,
  lastCheck: 2,
  speed: 3,
  uptime: 4,
  country: 5,
  anonimity: 6
};

function grabProxy(pageBody) {
  var $ = cheerio.load(pageBody),
      rows = $('#tbl_proxy_list tbody tr'),
      selectedIndex = Math.floor(rows.length * Math.random());

  var fields = getFieldsFor(rows.eq(selectedIndex)),
      stats = ["Country:", fields["country"], "| Uptime:", fields["uptime"]],
      host = [fields["ip"] + ":" + fields["port"]];

  /*
   *  Print everything to STDERR and the `host:port` part to STDOUT to be able
   *  to assign it to an ENV var.
   */

  console.error.apply(this, stats);
  console.error.apply(this, host);
  console.log.apply(this, host);
}

function getFieldsFor(row) {
  var fields = {},
      tds = row.find('td');

  Object.keys(fieldIndexes).forEach(function(fieldName) {
    fields[fieldName] = tds.eq(fieldIndexes[fieldName]).text().trim().replace(/\s+/g, ' ');
  });

  return fields;
}

http.get({
  host: 'www.proxynova.com',
  path: '/proxy-server-list/country-cn/'
}, function(resp) {
  var body = '';

  resp.on('data', function receiveChunk(d) {
    body += d;
  });

  resp.on('end', function receiveComplete() {
    grabProxy(body);
  });
});

