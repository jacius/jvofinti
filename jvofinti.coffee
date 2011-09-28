###
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
###


###############
# LENU BREGAU #
###############

jetnu = true
jitfa = false
tuho = null

Array.prototype.lingau     = Array.prototype.concat
Array.prototype.fengau     = Array.prototype.join
Array.prototype.rebylasna  = Array.prototype.push
Array.prototype.rebyvimcu  = Array.prototype.pop
Array.prototype.setca      = Array.prototype.splice
Array.prototype.porgau     = Array.prototype.sort
Array.prototype.fatne      = Array.prototype.reverse
Array.prototype.nilcla     = (-> this.length)
Array.prototype.judrynahu  = Array.prototype.indexOf
Array.prototype.vasru      = ((dacti) -> this.indexOf(dacti) != -1;)
Array.prototype.romoi      = (-> this[this.length-1])
Array.prototype.fukpi      = (-> this.slice())
Array.prototype.polje      = ((krasi, fancu) ->
  (krasi = fancu.call(this, krasi, i)) for i in this
  return krasi
)
Array.prototype.sumji      = (-> this.polje(0, (m,i)->m+i) )

String.prototype.katna     = String.prototype.split
String.prototype.mapti     = String.prototype.match
String.prototype.nilcla    = (-> this.length)
String.prototype.judrynahu = String.prototype.indexOf

if String.prototype.trim?
  String.prototype.kutkoivihu = String.prototype.trim
else
  String.prototype.kutkoivihu = ->
    return String(this).replace(/^\s+|\s+$/g, '');

hytytyp_cpacu = (url) ->
  selcpe = new XMLHttpRequest()
  selcpe.open("GET", url, jitfa)
  selcpe.send(tuho)
  return selcpe.responseText



###############################
# LE KARSNA LISTE JE SAMFANCU #
###############################

loi_karsna = 'a e i o u y'.katna(' ')
karsna = 'aeiouy'

# zoi gy. diphthongs .gy.
relkarsna = 'ai ei oi au ia ie ii io iu ua ue ui uo uu iy uy'.katna(' ')

# zoi gy. vowel pairs .gy.
karsna_remei = ("""
a'a  a'e  a'i  a'o  a'u   e'a  e'e  e'i  e'o  e'u
i'a  i'e  i'i  i'o  i'u   o'a  o'e  o'i  o'o  o'u
u'a  u'e  u'i  u'o  u'u
""".katna(/\s+/))

# zoi gy. is first letter vowel? .gy.
xu_kralerfu_karsna = (valsi) ->
  return !!valsi.mapti(///^[#{karsna}]///)

# zoi gy. is final letter vowel? .gy.
xu_famlerfu_karsna = (valsi) ->
  return !!valsi.mapti(///[#{karsna}]$///)



###################
# LE ZUNSNA LISTE #
###################

loi_zunsna = 'b c d f g j k l m n p r s t v x z'.katna(' ')
zunsna = 'bcdfgjklmnprstvxz'

# zoi gy. voiced consonants .gy.
loi_vokzunsna = 'b d g v j z'.katna(' ')
vokzunsna = /[bdgvjz]/

# zoi gy. unvoiced consonants .gy.
loi_tolvokzunsna = 'p t k f c s x'.katna(' ')
tolvokzunsna = /[ptkfcsx]/

# zoi gy. initial consonant pairs .gy.
pamoi_zunsna_remei = ("""
bl br   cf ck cl cm cn cp cr ct dj dr dz   fl fr
gl gr   jb jd jg jm jv   kl kr   ml mr   pl pr
sf sk sl sm sn sp sr st   tc tr ts
vl vr   xl xr   zb zd zg zm zv
""".katna(/\s+/))

tolselcru_zunsna_remei = 'cx kx xc xk mz'.katna(/\s+/)



######################
# LE ZUNSNA SAMFANCU #
######################

# zoi gy. is consonant pair allowed? .gy.
xu_zunsna_remei_selcru = (remei) ->
  pamoi = remei[0]
  remoi = remei[1]
  return jitfa if remei.nilcla() != 2
  return jitfa if pamoi == remoi
  return jitfa if (pamoi.mapti(/[cjsz]/) and
                   remoi.mapti(/[cjsz]/))
  return jitfa if (pamoi.mapti(vokzunsna) and
                   remoi.mapti(tolvokzunsna)) or
                  (remoi.mapti(vokzunsna) and
                   pamoi.mapti(tolvokzunsna))
  return jitfa if tolselcru_zunsna_remei.vasru(pamoi+remoi)
  return jetnu

# zoi gy. is consonant triplet allowed? .gy.
xu_zunsna_cimei_selcru = (cimei) ->
  return jetnu if xu_zunsna_remei_selcru(cimei[0..1]) and
                  pamoi_zunsna_remei.vasru(cimei[1..2])

# zoi gy. is first letter consonant? .gy.
xu_kralerfu_zunsna = (valsi) ->
  return !!valsi.mapti(///^[#{zunsna}]///)

# zoi gy. is final letter consonant? .gy.
xu_famlerfu_zunsna = (valsi) ->
  return !!valsi.mapti(///[#{zunsna}]$///)



#####################
# LE RAFSI SAMFANCU #
#####################

vlaste = {}
rafste = {}


lanli_rafsi_liste = (tertcidu) ->
  for vlalihi in tertcidu.katna('\n')
    unless vlalihi.mapti(/^\s*$/)
      pagbu = vlalihi.katna(/\s+/)

      unless vlaste.hasOwnProperty(pagbu[1])
        vlaste[pagbu[1]] = []
      vlaste[pagbu[1]].rebylasna(pagbu[0])
      rafste[pagbu[0]] = pagbu[1]

  return jetnu


cpacu_rafsi_liste = ->
  hytytyp_cpacu('rafsi.txt')

rafsi_liste = cpacu_rafsi_liste()
lanli_rafsi_liste( rafsi_liste )


valsi_pe_rafsi = (rafsi) ->
  return rafste[rafsi]

liherafsi_pe_valsi = (valsi) ->
  return tuho unless vlaste.hasOwnProperty(valsi)
  rafsi = vlaste[valsi].fukpi()
  rafsi.rebylasna(valsi[0..-2]) if valsi.nilcla() >= 5
  return rafsi.porgau()

rebrafsi_pe_valsi = (valsi) ->
  return tuho unless vlaste.hasOwnProperty(valsi)
  rebrafsi = (rafsi for rafsi in vlaste[valsi] \
              when xu_famlerfu_karsna(rafsi))
  rebrafsi.rebylasna(valsi) if valsi.nilcla() >= 5
  return rebrafsi.porgau()



#####################
# LE LUJVO SAMFANCU #
#####################

zbasu_ro_cumrafsymei = (vlameimei) ->
  rafsymeimei = []
  if vlameimei.nilcla() > 1
    for valsi in vlameimei[0..-2]
      rafsymeimei.push(liherafsi_pe_valsi(valsi))
  rafsymeimei.push( rebrafsi_pe_valsi(vlameimei.romoi()) )

  cmacnrekursi = (suhorafsymei) ->
    return [[]] if suhorafsymei.nilcla() < 1
    rebla = cmacnrekursi(suhorafsymei[1..-1])
    terpruce = []
    for sy in suhorafsymei[0]
      for ry in rebla
        terpruce.rebylasna([sy].lingau(ry))
    return terpruce

  return cmacnrekursi(rafsymeimei)


# zoi gy. insert hyphens .gy.
setca_rafterjohe = (rafsymei) ->
  lujvo = []
  for ibu in [(rafsymei.nilcla()-1)..0]
    rafsi = rafsymei[ibu]
    lamji = rafsymei[ibu-1]
    lujvo += rafsi

    if bavlahi
      # zoi gy. CVCC or CCVC .gy.
      if rafsi.mapti(///
        ^[#{zunsna}]
         [#{karsna}#{zunsna}]{2}
         [#{zunsna}]$
      ///)
        lujvo += 'y'

      # zoi gy. CVC followed by CC .gy.
      else if rafsi.mapti(///
        ^[#{zunsna}]
         [#{karsna}]
         [#{zunsna}]$
      ///) and bavlahi.mapti(///^[#{zunsna}]{2}///)
        lujvo += 'y'

      # xu le valsi cu pamoi .ije le re famlerfu cu karsna
      else if (ibu == 0) and rafsi.mapti(/[aeiou]\'?[aeiou]$/)
        # xu le kralerfu cu zunsna .ije le bavla'i lerfu cu karsna
        if bavlahi.mapti(///^[#{zunsna}][aeiou]///)
          unless bavlahi[0] == 'r'
            lujvo += 'r'
          else
            lujvo += 'n'

  return lujvo


setca_rafterjohe = (rafsymei) ->
  cvcc = ///^[#{zunsna}][#{karsna}][#{zunsna}][#{zunsna}]$///
  ccvc = ///^[#{zunsna}][#{zunsna}][#{karsna}][#{zunsna}]$///
  ccv  = ///^[#{zunsna}][#{zunsna}][#{karsna}]$///
  cvv  = ///^[#{zunsna}][#{karsna}]'?[#{karsna}]$///

  nilcla = rafsymei.nilcla()
  pamoi = rafsymei[0]
  remoi = rafsymei[1]

  if nilcla > 2 and pamoi.mapti(cvv) and
     (not remoi.mapti(ccv) or remoi.mapti(ccvc))
    if remoi[0] == 'r'
      rafsymei.setca(1, 0, 'r')
    else
      rafsymei.setca(1, 0, 'n')

  for i in [(nilcla-1)..0]
    rafsi = rafsymei[i]
    lamji = rafsymei[i-1]

    if lamji
      if lamji.mapti(cvcc) or lamji.mapti(ccvc) or
         (not xu_zunsna_remei_selcru(lamji[-1..-1] + rafsi[0]))
        rafsymei.setca(i, 0, 'y')

  rafsymei = tosmabru_cipra(rafsymei)

  return rafsymei

tosmabru_cipra = (rafsymei) ->

  # zoi gy. one or more initial CVC-form rafsi, followed by:
  #  1. a CVCCV-form rafsi where the CC cluster is a permissible
  #     initial pair; or,
  #  2. a 'y' that was inserted earlier.
  # .gy.
  lermorna = ///^
    ([#{zunsna}][#{karsna}][#{zunsna}])+
    ([#{zunsna}][#{karsna}][#{zunsna}][#{zunsna}][#{karsna}]
     | y)
    ///

  # xu le lo'u tosmabru le'u cipra cu tolsarcu
  if not rafsymei.fengau('').mapti(lermorna)
    # tolgalfi
    return rafsymei

  ybu_judrynahu = rafsymei.judrynahu('y')
  ybu_judrynahu = rafsymei.nilcla()-1 if ybu_judrynahu < 0

  # cipra le tolselcru pamoi bo zunsna bo remei
  for i in [0..ybu_judrynahu]
    rafsi = rafsymei[i]
    lamji = rafsymei[i+1]

    if lamji
      if xu_famlerfu_zunsna(rafsi) and
         xu_kralerfu_zunsna(lamji) and not
         pamoi_zunsna_remei.vasru(rafsi[-1..-1] + lamji[0])
        # tolgalfi
        return rafsymei

  for i in [0..ybu_judrynahu]
    rafsi = rafsymei[i]
    lamji = rafsymei[i+1]

    if lamji
      if xu_famlerfu_zunsna(rafsi) and
         xu_kralerfu_zunsna(lamji)
        rafsymei.setca(i+1, 0, 'y')
        break

  return rafsymei



#####################
# LE MELRI SAMFANCU #
#####################

kancu_mapti = (valsi, lermorna) ->
  return valsi.katna(lermorna).nilcla() - 1

merli_rafsi = (rafsi) ->
  c = zunsna
  v = karsna
  return 1 if rafsi.mapti(///^[#{c}][#{v}][#{c}][#{c}][#{v}]$///)
  return 2 if rafsi.mapti(///^[#{c}][#{v}][#{c}][#{c}]$///)
  return 3 if rafsi.mapti(///^[#{c}][#{c}][#{v}][#{c}][#{v}]$///)
  return 4 if rafsi.mapti(///^[#{c}][#{c}][#{v}][#{c}]$///)
  return 5 if rafsi.mapti(///^[#{c}][#{v}][#{c}]$///)
  return 6 if rafsi.mapti(///^[#{c}][#{v}]'[#{v}]$///)
  return 7 if rafsi.mapti(///^[#{c}][#{c}][#{v}]$///)
  return 8 if rafsi.mapti(///^[#{c}][#{v}][#{v}]$///)
  return 0

merli_rafsymei = (rafsymei) ->
  lujvo = rafsymei.fengau('')
  L = lujvo.nilcla()
  A = kancu_mapti(lujvo, /\'/)
  H = (r for r in rafsymei when r.mapti(/^[ynr]$/)).nilcla()
  R = (merli_rafsi(r) for r in rafsymei).sumji()
  V = kancu_mapti(lujvo, /[aeiou]/)
  return (1000 * L) - (500 * A) + (100 * H) - (10 * R) - V

porgau_cumrafsymei = (cumrafsymei) ->
  cumrafsymei = ([merli_rafsymei(r),r] for r in cumrafsymei)
  return cumrafsymei.porgau((a,b) -> a[0] - b[0])



########################
# LE MUTPAPRI SAMFANCU #
########################

jarco_selstidi = (cumrafsymei) ->
  termremei = porgau_cumrafsymei(cumrafsymei)
  liste = document.getElementById('selstidi-liste')
  liste.innerHTML = (for cmima in termremei
    termre = cmima[0]
    lujvo = cmima[1].fengau('')
    """<li><span class=\"lujvo\">#{lujvo}</span>
           <span class=\"termre\">(#{termre})</span></li>"""
  ).fengau('\n')
  document.getElementById('selstidi').style['display'] = tuho

mipri_selstidi = ->
  document.getElementById('selstidi').style['display'] = 'none'


xu_rotanru_drani = (tanru) ->
  for valsi in tanru
    unless vlaste[valsi]
      return false
  return true


pruce_tanru = (selpruce) ->
  lerlinsi = selpruce.value
  tanru = lerlinsi.kutkoivihu().katna(/\s+/)

  if xu_rotanru_drani(tanru)
    selpruce.className = 'drani'
  else if lerlinsi == ''
    selpruce.className = tuho
    mipri_selstidi()
    return
  else
    selpruce.className = 'srera'
    return

  cumrafsymei = zbasu_ro_cumrafsymei(tanru)
  cumrafsymei = (setca_rafterjohe(r) for r in cumrafsymei)
  jarco_selstidi(cumrafsymei)


window.onload = ->
  document.getElementById('tanru-selpruce').onkeyup = ->
    pruce_tanru(this)
