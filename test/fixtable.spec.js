var buildTable = function (tableClass) {

  // create root node for fixtable component
  var fixtable = document.createElement('div');
  fixtable.classList.add('fixtable');

  // add div.fixtable-header
  var header = document.createElement('div');
  header.classList.add('fixtable-header');
  fixtable.appendChild(header);

  // add div.fixtable-filters
  var filters = document.createElement('div');
  filters.classList.add('fixtable-filters');
  fixtable.appendChild(filters);

  // add div.fixtable-inner
  var inner = document.createElement('div');
  inner.classList.add('fixtable-inner');
  fixtable.appendChild(inner);

  // add table
  var table = document.createElement('table');
  if (tableClass) {
    table.classList.add(tableClass);
  }
  inner.appendChild(table);

  // add table header rows
  var tableHead = document.createElement('thead');
  table.appendChild(tableHead);
  var columnHeaders = document.createElement('tr');
  columnHeaders.classList.add('fixtable-column-headers');
  tableHead.appendChild(columnHeaders);
  var columnFilters = document.createElement('tr');
  columnFilters.classList.add('fixtable-column-filters');
  tableHead.appendChild(columnFilters);

  // add table body
  var tableBody = table.appendChild(document.createElement('tbody'));

  // add div.fixtable-footer
  var footer = document.createElement('div');
  footer.classList.add('fixtable-footer');
  fixtable.appendChild(footer);

  // add it all to the page
  var container = document.querySelector('#fixtableContainer');
  return container.appendChild(fixtable);

}

var createSizedElement = function (width, height, color) {
  var width = width || 25;
  var height = height || 25;
  var color = color || 'black';
  var newElement = document.createElement('div');
  newElement.style.width = width + "px";
  newElement.style.height = height + "px";
  newElement.style.backgroundColor = color;
  return newElement;
}

var fillTable = function (fixtable, labels, rows) {
  var columnHeaders = fixtable.querySelector('tr.fixtable-column-headers');
  var tableBody = fixtable.querySelector('tbody');
  for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    var th = document.createElement('th');
    var div = document.createElement('div');
    var placeholder = createSizedElement(label.width, label.height, 'darkblue');
    columnHeaders.appendChild(th).appendChild(div).appendChild(placeholder);
  }
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var tr = tableBody.appendChild(document.createElement('tr'));
    for (var j = 0; j < row.length; j++) {
      var cell = row[j];
      var td = document.createElement('td');
      var placeholder = createSizedElement(cell.width, cell.height, 'lightblue');
      tr.appendChild(td).appendChild(placeholder);
    }
  }
}

var setContainerSize = function (width, height) {
  var width = width || '100%';
  var height = height || 'auto';
  var container = document.querySelector('#fixtableContainer');
  container.style.width = width;
  container.style.height = height;
}

var clearContainer = function () {
  var container = document.querySelector('#fixtableContainer');
  container.innerHTML = '';
}

describe('Fixtable', function () {

  afterEach(function () {
    clearContainer();
  });

  describe('constructor', function () {

    it('fails when element argument is missing', function () {
      expect(function () {
        return new Fixtable();
      }).to.throw(Error);
    });

    it('fails when element argument is unexpected type', function () {
      expect(function () {
        return new Fixtable(new Object());
      }).to.throw(Error);
    });

    it('succeeds when element argument is expected type', function () {
      expect(new Fixtable(buildTable())).to.be.instanceof(Fixtable);
    });

  });

  describe('setColumnWidth', function () {

    it('sets column widths', function () {
      setContainerSize('600px', 'auto');
      var table = buildTable();
      var labels = [{width: 50}, {width: 75}, {width: 50}, {width: 50}];
      var rows = [
        [{width: 25}, {width: 150}, {width: 100}, {width: 75}],
        [{width: 50}, {width: 175}, {width: 100}, {width: 75}],
        [{width: 25}, {width: 150}, {width: 75}, {width: 75}]
      ];
      fillTable(table, labels, rows);
      var fixtable = new Fixtable(table);
      fixtable.setColumnWidth(1, 100);
      fixtable.setColumnWidth(2, 225);
      fixtable.setColumnWidth(3, 150);
      fixtable.setColumnWidth(4, 125);
      fixtable.setDimensions();
      var columnHeaders = table.querySelector('tr.fixtable-column-headers');
      var headerCells = columnHeaders.querySelectorAll('th');
      var columnLabels = columnHeaders.querySelectorAll('th > div');
      expect(headerCells.length).to.equal(4);
      expect(columnLabels.length).to.equal(4);
      expect(headerCells[0].offsetWidth).to.equal(100);
      expect(headerCells[1].offsetWidth).to.equal(225);
      expect(headerCells[2].offsetWidth).to.equal(150);
      expect(headerCells[3].offsetWidth).to.equal(125);
      expect(columnLabels[0].offsetWidth).to.equal(100);
      expect(columnLabels[1].offsetWidth).to.equal(225);
      expect(columnLabels[2].offsetWidth).to.equal(150);
      expect(columnLabels[3].offsetWidth).to.equal(125);
    });

  });

  describe('setDimensions', function () {

    it('resizes all column labels to match height of tallest', function () {
      setContainerSize('600px', 'auto');
      var table = buildTable();
      var labels = [{width: 50}, {width: 75}, {width: 50}, {width: 50, height: 100}];
      var rows = [
        [{width: 25}, {width: 150}, {width: 100}, {width: 75}],
        [{width: 50}, {width: 175}, {width: 100}, {width: 75}],
        [{width: 25}, {width: 150}, {width: 75}, {width: 75}]
      ];
      fillTable(table, labels, rows);
      var fixtable = new Fixtable(table);
      fixtable.setColumnWidth(1, 75);
      fixtable.setColumnWidth(2, 200);
      fixtable.setColumnWidth(3, 125);
      fixtable.setColumnWidth(4, 100);
      fixtable.setDimensions();
      var columnHeaders = table.querySelector('tr.fixtable-column-headers');
      var headerCells = columnHeaders.querySelectorAll('th');
      var columnLabels = columnHeaders.querySelectorAll('th > div');
      expect(headerCells.length).to.equal(4);
      expect(columnLabels.length).to.equal(4);
      expect(headerCells[0].offsetHeight).to.equal(100);
      expect(headerCells[1].offsetHeight).to.equal(100);
      expect(headerCells[2].offsetHeight).to.equal(100);
      expect(headerCells[3].offsetHeight).to.equal(100);
      expect(columnLabels[0].offsetHeight).to.equal(100);
      expect(columnLabels[1].offsetHeight).to.equal(100);
      expect(columnLabels[2].offsetHeight).to.equal(100);
      expect(columnLabels[3].offsetHeight).to.equal(100);
    });

  });

});
