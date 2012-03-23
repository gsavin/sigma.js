//
// Guilhelm Savin @ LITIS, Université du Havre
// GraphStream : http://graphstream-project.org
//
sigma.publicPrototype.parseDGS = function(dgsPath) {
    var dgshttp, dgs;
    var sigmaInstance = this;
    var re;
    var line, dir;

    dgshttp = window.XMLHttpRequest ?
	new XMLHttpRequest() :
	new ActiveXObject('Microsoft.XMLHTTP');
    
    dgshttp.overrideMimeType('text/plain');
    dgshttp.open('GET', dgsPath, false);
    dgshttp.send();
    dgs = dgshttp.responseText.split('\n').reverse();
    
    re = /^DGS00\d$/;
    line = dgs.pop();
    if (!re.test(line))
	throw new Error("invalid dgs header '" + line + "'");

    re = /^\S+ \d+ \d+$/;
    line = dgs.pop();
    if (!re.test(line))
	throw new Error("invalid dgs header '" + line + "'");

    while ((line = dgs.pop())) {
	//
	// Skip empty lines and comments
	//
	if (line.length == 0 || line.charAt(0) == '#')
	    continue;

	dir = line.substr(0, 2).toLowerCase();
	line = line.substr(3, line.length-3);

	switch(dir) {
	case 'an':
	    var id = nextId(line);
	    line = line.substring(id.length, line.length);
	    sigmaInstance.addNode(id, {});
	    parseAttributes('node', id, line);
	    break;
	case 'cn':
	    var id = nextId(line);
	    line = line.substring(id.length, line.length);
	    parseAttributes('node', this.nodesIndex[id], line);
	    break;
	case 'dn':
	    var id = nextId(line);
	    sigmaInstance.dropNode(id);
	    break;
	case 'ae':
	    var id = nextId(line);
	    line = line.substring(id.length, line.length);
	    var source = nextId(line);
	    line = line.substring(id.length, line.length);
	    var target = nextId(line);
	    line = line.substring(id.length, line.length);
	    
	    sigmaInstance.addEdge(id, source, target, {});
	    break;
	case 'ce':
	    var id = nextId(line);
	    line = line.substring(id.length, line.length);
	    parseAttributes('edge', this.edgesIndex[id], line);
	    break;
	case 'de':
	    var id = nextId(line);
	    sigmaInstance.dropEdge(id);
	    parseAttributes('edge', id, line);
	    break;
	case 'cg':
	    break;
	case 'st':
	    break;
	case 'cl':
	    sigmaInstance.empty();
	    break;
	default:
	    throw new Error("unknown directive '" + dir + "'");
	}
    }
  }
};

function nextId(line) {
    
}

function parseAttributes(type, e, attributes) {
    switch(type) {
    case 'node':
	
	break;
    case 'edge':
	break;
    }
}