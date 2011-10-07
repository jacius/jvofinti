(function() {
  /*
  jvofinti - lojban lujvo creation tool
  Copyright (c) 2011  John Croisant
  
  jvofinti is licensed under the following terms (the "MIT License"):
  
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

  var cpacu_rafsi_liste, hytytyp_cpacu, jarco_selstidi, jetnu, jitfa, kancu_mapti, karsna, karsna_remei, lanli_rafsi_liste, liherafsi_pe_valsi, loi_karsna, loi_tolvokzunsna, loi_vokzunsna, loi_zunsna, merli_rafsi, merli_rafsymei, mipri_selstidi, pamoi_zunsna_remei, porgau_cumrafsymei, pruce_tanru, rafsi_liste, rafste, rebrafsi_pe_valsi, relkarsna, setca_rafterjohe, tolselcru_zunsna_remei, tolvokzunsna, tosmabru_cipra, tuho, valsi_pe_rafsi, vlaste, vokzunsna, xu_famlerfu_karsna, xu_famlerfu_zunsna, xu_kralerfu_karsna, xu_kralerfu_zunsna, xu_rotanru_drani, xu_zunsna_cimei_selcru, xu_zunsna_remei_selcru, zbasu_ro_cumrafsymei, zunsna;
  jetnu = true;
  jitfa = false;
  tuho = null;
  Array.prototype.lingau = Array.prototype.concat;
  Array.prototype.fengau = Array.prototype.join;
  Array.prototype.rebylasna = Array.prototype.push;
  Array.prototype.rebyvimcu = Array.prototype.pop;
  Array.prototype.setca = Array.prototype.splice;
  Array.prototype.porgau = Array.prototype.sort;
  Array.prototype.fatne = Array.prototype.reverse;
  Array.prototype.nilcla = (function() {
    return this.length;
  });
  Array.prototype.judrynahu = Array.prototype.indexOf;
  Array.prototype.vasru = (function(dacti) {
    return this.indexOf(dacti) !== -1;
  });
  Array.prototype.romoi = (function() {
    return this[this.length - 1];
  });
  Array.prototype.fukpi = (function() {
    return this.slice();
  });
  Array.prototype.polje = (function(krasi, fancu) {
    var i, _i, _len;
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      i = this[_i];
      krasi = fancu.call(this, krasi, i);
    }
    return krasi;
  });
  Array.prototype.sumji = (function() {
    return this.polje(0, function(m, i) {
      return m + i;
    });
  });
  String.prototype.katna = String.prototype.split;
  String.prototype.mapti = String.prototype.match;
  String.prototype.nilcla = (function() {
    return this.length;
  });
  String.prototype.judrynahu = String.prototype.indexOf;
  if (String.prototype.trim != null) {
    String.prototype.kutkoivihu = String.prototype.trim;
  } else {
    String.prototype.kutkoivihu = function() {
      return String(this).replace(/^\s+|\s+$/g, '');
    };
  }
  hytytyp_cpacu = function(url) {
    var selcpe;
    selcpe = new XMLHttpRequest();
    selcpe.open("GET", url, jitfa);
    selcpe.send(tuho);
    return selcpe.responseText;
  };
  loi_karsna = 'a e i o u y'.katna(' ');
  karsna = 'aeiouy';
  relkarsna = 'ai ei oi au ia ie ii io iu ua ue ui uo uu iy uy'.katna(' ');
  karsna_remei = "a'a  a'e  a'i  a'o  a'u   e'a  e'e  e'i  e'o  e'u\ni'a  i'e  i'i  i'o  i'u   o'a  o'e  o'i  o'o  o'u\nu'a  u'e  u'i  u'o  u'u".katna(/\s+/);
  xu_kralerfu_karsna = function(valsi) {
    return !!valsi.mapti(RegExp("^[" + karsna + "]"));
  };
  xu_famlerfu_karsna = function(valsi) {
    return !!valsi.mapti(RegExp("[" + karsna + "]$"));
  };
  loi_zunsna = 'b c d f g j k l m n p r s t v x z'.katna(' ');
  zunsna = 'bcdfgjklmnprstvxz';
  loi_vokzunsna = 'b d g v j z'.katna(' ');
  vokzunsna = /[bdgvjz]/;
  loi_tolvokzunsna = 'p t k f c s x'.katna(' ');
  tolvokzunsna = /[ptkfcsx]/;
  pamoi_zunsna_remei = "bl br   cf ck cl cm cn cp cr ct dj dr dz   fl fr\ngl gr   jb jd jg jm jv   kl kr   ml mr   pl pr\nsf sk sl sm sn sp sr st   tc tr ts\nvl vr   xl xr   zb zd zg zm zv".katna(/\s+/);
  tolselcru_zunsna_remei = 'cx kx xc xk mz'.katna(/\s+/);
  xu_zunsna_remei_selcru = function(remei) {
    var pamoi, remoi;
    pamoi = remei[0];
    remoi = remei[1];
    if (remei.nilcla() !== 2) return jitfa;
    if (pamoi === remoi) return jitfa;
    if (pamoi.mapti(/[cjsz]/) && remoi.mapti(/[cjsz]/)) return jitfa;
    if ((pamoi.mapti(vokzunsna) && remoi.mapti(tolvokzunsna)) || (remoi.mapti(vokzunsna) && pamoi.mapti(tolvokzunsna))) {
      return jitfa;
    }
    if (tolselcru_zunsna_remei.vasru(pamoi + remoi)) return jitfa;
    return jetnu;
  };
  xu_zunsna_cimei_selcru = function(cimei) {
    if (xu_zunsna_remei_selcru(cimei.slice(0, 2)) && pamoi_zunsna_remei.vasru(cimei.slice(1, 3))) {
      return jetnu;
    }
  };
  xu_kralerfu_zunsna = function(valsi) {
    return !!valsi.mapti(RegExp("^[" + zunsna + "]"));
  };
  xu_famlerfu_zunsna = function(valsi) {
    return !!valsi.mapti(RegExp("[" + zunsna + "]$"));
  };
  vlaste = {};
  rafste = {};
  lanli_rafsi_liste = function(tertcidu) {
    var pagbu, vlalihi, _i, _len, _ref;
    _ref = tertcidu.katna('\n');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vlalihi = _ref[_i];
      if (!vlalihi.mapti(/^\s*$/)) {
        pagbu = vlalihi.katna(/\s+/);
        if (!vlaste.hasOwnProperty(pagbu[1])) vlaste[pagbu[1]] = [];
        vlaste[pagbu[1]].rebylasna(pagbu[0]);
        rafste[pagbu[0]] = pagbu[1];
      }
    }
    return jetnu;
  };
  cpacu_rafsi_liste = function() {
    return hytytyp_cpacu('rafsi.txt');
  };
  rafsi_liste = cpacu_rafsi_liste();
  lanli_rafsi_liste(rafsi_liste);
  valsi_pe_rafsi = function(rafsi) {
    return rafste[rafsi];
  };
  liherafsi_pe_valsi = function(valsi) {
    var rafsi;
    if (!vlaste.hasOwnProperty(valsi)) return tuho;
    rafsi = vlaste[valsi].fukpi();
    if (valsi.nilcla() >= 5) rafsi.rebylasna(valsi.slice(0, -1));
    return rafsi.porgau();
  };
  rebrafsi_pe_valsi = function(valsi) {
    var rafsi, rebrafsi;
    if (!vlaste.hasOwnProperty(valsi)) return tuho;
    rebrafsi = (function() {
      var _i, _len, _ref, _results;
      _ref = vlaste[valsi];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        rafsi = _ref[_i];
        if (xu_famlerfu_karsna(rafsi)) _results.push(rafsi);
      }
      return _results;
    })();
    if (valsi.nilcla() >= 5) rebrafsi.rebylasna(valsi);
    return rebrafsi.porgau();
  };
  zbasu_ro_cumrafsymei = function(vlameimei) {
    var cmacnrekursi, rafsymeimei, valsi, _i, _len, _ref;
    rafsymeimei = [];
    if (vlameimei.nilcla() > 1) {
      _ref = vlameimei.slice(0, -1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        valsi = _ref[_i];
        rafsymeimei.push(liherafsi_pe_valsi(valsi));
      }
    }
    rafsymeimei.push(rebrafsi_pe_valsi(vlameimei.romoi()));
    cmacnrekursi = function(suhorafsymei) {
      var rebla, ry, sy, terpruce, _j, _k, _len2, _len3, _ref2;
      if (suhorafsymei.nilcla() < 1) return [[]];
      rebla = cmacnrekursi(suhorafsymei.slice(1));
      terpruce = [];
      _ref2 = suhorafsymei[0];
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        sy = _ref2[_j];
        for (_k = 0, _len3 = rebla.length; _k < _len3; _k++) {
          ry = rebla[_k];
          terpruce.rebylasna([sy].lingau(ry));
        }
      }
      return terpruce;
    };
    return cmacnrekursi(rafsymeimei);
  };
  setca_rafterjohe = function(rafsymei) {
    var ccv, ccvc, cvcc, cvv, i, lamji, nilcla, pamoi, rafsi, remoi, _ref;
    cvcc = RegExp("^[" + zunsna + "][" + karsna + "][" + zunsna + "][" + zunsna + "]$");
    ccvc = RegExp("^[" + zunsna + "][" + zunsna + "][" + karsna + "][" + zunsna + "]$");
    ccv = RegExp("^[" + zunsna + "][" + zunsna + "][" + karsna + "]$");
    cvv = RegExp("^[" + zunsna + "][" + karsna + "]'?[" + karsna + "]$");
    nilcla = rafsymei.nilcla();
    pamoi = rafsymei[0];
    remoi = rafsymei[1];
    if (nilcla > 2 && pamoi.mapti(cvv) && (!remoi.mapti(ccv) || remoi.mapti(ccvc))) {
      if (remoi[0] === 'r') {
        rafsymei.setca(1, 0, 'n');
      } else {
        rafsymei.setca(1, 0, 'r');
      }
    }
    for (i = _ref = nilcla - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
      rafsi = rafsymei[i];
      lamji = rafsymei[i - 1];
      if (lamji) {
        if (lamji.mapti(cvcc) || lamji.mapti(ccvc) || (!xu_zunsna_remei_selcru(lamji.slice(-1) + rafsi[0]))) {
          rafsymei.setca(i, 0, 'y');
        }
      }
    }
    rafsymei = tosmabru_cipra(rafsymei);
    return rafsymei;
  };
  tosmabru_cipra = function(rafsymei) {
    var i, lamji, lermorna, rafsi, ybu_judrynahu;
    lermorna = RegExp("^([" + zunsna + "][" + karsna + "][" + zunsna + "])+([" + zunsna + "][" + karsna + "][" + zunsna + "][" + zunsna + "][" + karsna + "]|y)");
    if (!rafsymei.fengau('').mapti(lermorna)) return rafsymei;
    ybu_judrynahu = rafsymei.judrynahu('y');
    if (ybu_judrynahu < 0) ybu_judrynahu = rafsymei.nilcla() - 1;
    for (i = 0; 0 <= ybu_judrynahu ? i <= ybu_judrynahu : i >= ybu_judrynahu; 0 <= ybu_judrynahu ? i++ : i--) {
      rafsi = rafsymei[i];
      lamji = rafsymei[i + 1];
      if (lamji) {
        if (xu_famlerfu_zunsna(rafsi) && xu_kralerfu_zunsna(lamji) && !pamoi_zunsna_remei.vasru(rafsi.slice(-1) + lamji[0])) {
          return rafsymei;
        }
      }
    }
    for (i = 0; 0 <= ybu_judrynahu ? i <= ybu_judrynahu : i >= ybu_judrynahu; 0 <= ybu_judrynahu ? i++ : i--) {
      rafsi = rafsymei[i];
      lamji = rafsymei[i + 1];
      if (lamji) {
        if (xu_famlerfu_zunsna(rafsi) && xu_kralerfu_zunsna(lamji)) {
          rafsymei.setca(i + 1, 0, 'y');
          break;
        }
      }
    }
    return rafsymei;
  };
  kancu_mapti = function(valsi, lermorna) {
    return valsi.katna(lermorna).nilcla() - 1;
  };
  merli_rafsi = function(rafsi) {
    var c, v;
    c = zunsna;
    v = karsna;
    if (rafsi.mapti(RegExp("^[" + c + "][" + v + "][" + c + "][" + c + "][" + v + "]$"))) {
      return 1;
    }
    if (rafsi.mapti(RegExp("^[" + c + "][" + v + "][" + c + "][" + c + "]$"))) {
      return 2;
    }
    if (rafsi.mapti(RegExp("^[" + c + "][" + c + "][" + v + "][" + c + "][" + v + "]$"))) {
      return 3;
    }
    if (rafsi.mapti(RegExp("^[" + c + "][" + c + "][" + v + "][" + c + "]$"))) {
      return 4;
    }
    if (rafsi.mapti(RegExp("^[" + c + "][" + v + "][" + c + "]$"))) return 5;
    if (rafsi.mapti(RegExp("^[" + c + "][" + v + "]'[" + v + "]$"))) return 6;
    if (rafsi.mapti(RegExp("^[" + c + "][" + c + "][" + v + "]$"))) return 7;
    if (rafsi.mapti(RegExp("^[" + c + "][" + v + "][" + v + "]$"))) return 8;
    return 0;
  };
  merli_rafsymei = function(rafsymei) {
    var A, H, L, R, V, lujvo, r;
    lujvo = rafsymei.fengau('');
    L = lujvo.nilcla();
    A = kancu_mapti(lujvo, /\'/);
    H = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rafsymei.length; _i < _len; _i++) {
        r = rafsymei[_i];
        if (r.mapti(/^[ynr]$/)) _results.push(r);
      }
      return _results;
    })()).nilcla();
    R = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = rafsymei.length; _i < _len; _i++) {
        r = rafsymei[_i];
        _results.push(merli_rafsi(r));
      }
      return _results;
    })()).sumji();
    V = kancu_mapti(lujvo, /[aeiou]/);
    return (1000 * L) - (500 * A) + (100 * H) - (10 * R) - V;
  };
  porgau_cumrafsymei = function(cumrafsymei) {
    var r;
    cumrafsymei = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cumrafsymei.length; _i < _len; _i++) {
        r = cumrafsymei[_i];
        _results.push([merli_rafsymei(r), r]);
      }
      return _results;
    })();
    return cumrafsymei.porgau(function(a, b) {
      return a[0] - b[0];
    });
  };
  jarco_selstidi = function(cumrafsymei) {
    var cmima, liste, lujvo, termre, termremei;
    termremei = porgau_cumrafsymei(cumrafsymei);
    liste = document.getElementById('selstidi-liste');
    liste.innerHTML = ((function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = termremei.length; _i < _len; _i++) {
        cmima = termremei[_i];
        termre = cmima[0];
        lujvo = cmima[1].fengau('');
        _results.push("<li><span class=\"lujvo\">" + lujvo + "</span>\n<span class=\"termre\">(" + termre + ")</span></li>");
      }
      return _results;
    })()).fengau('\n');
    return document.getElementById('selstidi').style['display'] = tuho;
  };
  mipri_selstidi = function() {
    return document.getElementById('selstidi').style['display'] = 'none';
  };
  xu_rotanru_drani = function(tanru) {
    var valsi, _i, _len;
    for (_i = 0, _len = tanru.length; _i < _len; _i++) {
      valsi = tanru[_i];
      if (!vlaste[valsi]) return false;
    }
    return true;
  };
  pruce_tanru = function(selpruce) {
    var cumrafsymei, lerlinsi, r, tanru;
    lerlinsi = selpruce.value;
    tanru = lerlinsi.kutkoivihu().katna(/\s+/);
    if (xu_rotanru_drani(tanru)) {
      selpruce.className = 'drani';
    } else if (lerlinsi === '') {
      selpruce.className = tuho;
      mipri_selstidi();
      return;
    } else {
      selpruce.className = 'srera';
      return;
    }
    cumrafsymei = zbasu_ro_cumrafsymei(tanru);
    cumrafsymei = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cumrafsymei.length; _i < _len; _i++) {
        r = cumrafsymei[_i];
        _results.push(setca_rafterjohe(r));
      }
      return _results;
    })();
    return jarco_selstidi(cumrafsymei);
  };
  window.onload = function() {
    return document.getElementById('tanru-selpruce').onkeyup = function() {
      return pruce_tanru(this);
    };
  };
}).call(this);
