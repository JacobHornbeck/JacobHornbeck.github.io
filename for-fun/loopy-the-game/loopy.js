var field_dim = new PVector(7,7);
var dim_size = new PVector(width/field_dim.x,height/field_dim.y);

var Node = function(x,y) {
    this.x = x||null;
    this.y = y||null;
    this.u = null;
    this.r = null;
    this.d = null;
    this.l = null;
    this.draw = function(n) {
        noFill();
        stroke(0);
        ellipse(this.x,this.y,5,5);
    };
    this.init = function(u,r,d,l) {
        this.u = u||null;
        this.r = r||null;
        this.d = d||null;
        this.l = l||null;
    };
};

var nodes = [];
for (var y = 0; y<=height; y+=(height/(field_dim.y+0.001))) {
    for (var x = 0; x<=width; x+=(width/(field_dim.x+0.001))) {
        nodes.push(new Node(x,y));
    }
}

for (var n = 0; n<nodes.length; n++) {
    var u, r, d, l;
    if (n < 8)      { u = null;       }
    else            { u = nodes[n-8]; }
    if (n%8 === 7)  { r = null;       }
    else            { r = nodes[n+1]; }
    if (n > 55)     { d = null;       }
    else            { d = nodes[n+8]; }
    if (n%8 === 0)  { l = null;       }
    else            { l = nodes[n-1]; }
    
    nodes[n].init(u, r, d, l);
}

draw = function() {
    background(255);
    
    for (var n = 0; n<nodes.length; n++) {
        nodes[n].draw(n);
    }
};

