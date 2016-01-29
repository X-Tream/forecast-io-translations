function join_with_shared_prefix(a, b, joiner) {
  var m = a,
      i = 0,
      j;

  while(i !== m.length &&
        i !== b.length &&
        m.charCodeAt(i) === b.charCodeAt(i))
    ++i;

  while(i && m.charCodeAt(i - 1) !== 32)
    --i;

  return a + joiner + b.slice(i);
}

function strip_prefix(period) {
  return period.slice(0, 9) === "yön yli" ? period.slice(4) :
         period.slice(0, 7) ===   "" ? period.slice(7) :
                                              period;
}

module.exports = require("../template")({
  "clear": "poutaa",
  "no-precipitation": "sademäärä ei mitattavissa",
  "mixed-precipitation": "sekoitettu sademäärä",
  "possible-very-light-precipitation": "mahdollisesti erittäin kevyt sademäärä",
  "very-light-precipitation": "kevyt sademäärä",
  "possible-light-precipitation": "mahdollisesti kevyt sademäärä",
  "light-precipitation": "kevyt sademäärä",
  "medium-precipitation": "sademäärä",
  "heavy-precipitation": "raskas sademäärä",
  "possible-very-light-rain": "mahdollisesti tihkusadetta",
  "very-light-rain": "tihkusadetta",
  "possible-light-rain": "mahdollisesti sadetta",
  "light-rain": "kevyttä sadetta",
  "medium-rain": "sadetta",
  "heavy-rain": "rankkasadetta",
  "possible-very-light-sleet": "mahdollisesti vähän räntää",
  "very-light-sleet": "vähän räntää",
  "possible-light-sleet": "mahdollisesti räntää",
  "light-sleet": "kevyttä räntää",
  "medium-sleet": "räntää",
  "heavy-sleet": "paljon räntää",
  "possible-very-light-snow": "mahdollisesti lumikuuroja",
  "very-light-snow": "lumikuuroja",
  "possible-light-snow": "mahdollisesti kevyttä lunta",
  "light-snow": "kevyttä lunta",
  "medium-snow": "lunta",
  "heavy-snow": "paljon lunta",
  "light-wind": "kevyttä tuulta",
  "medium-wind": "tuulista",
  "heavy-wind": "todella tuulista",
  "low-humidity": "kuivaa",
  "high-humidity": "kosteaa",
  "fog": "sumuista",
  "light-clouds": "osittain pilvistä",
  "medium-clouds": "enimmäkseen pilvistä",
  "heavy-clouds": "pilvistä",
  "today-morning": "tänä aamuna",
  "later-today-morning": "myöhemmin tänä aamuna",
  "today-afternoon": "tänä iltapäivänä",
  "later-today-afternoon": "myöhemmin tänä iltapäivänä",
  "today-evening": "tänä iltana",
  "later-today-evening": "myöhemmin tänä iltana",
  "today-night": "tänä iltana",
  "later-today-night": "myöhemmin päivällä",
  "tomorrow-morning": "huomen aamulla",
  "tomorrow-afternoon": "huomen iltapäivällä",
  "tomorrow-evening": "huomen illalla",
  "tomorrow-night": "huomen yöllä",
  "morning": "aamulla",
  "afternoon": "iltapäivällä",
  "evening": "illalla",
  "night": "yöllä",
  "today": "tänään",
  "tomorrow": "huomenna",
  "sunday": "sunnuntaina",
  "monday": "maanantaina",
  "tuesday": "tiistaina",
  "wednesday": "keskiviikkona",
  "thursday": "torstaina",
  "friday": "perjantaina",
  "saturday": "lauantaina",
  "minutes": "$1 min.",
  "fahrenheit": "$1\u00B0F",
  "celsius": "$1\u00B0C",
  "inches": "$1 in.",
  "centimeters": "$1 cm.",
  "less-than": "alle $1",
  "and": function(a, b) {
    return join_with_shared_prefix(
      a,
      b,
      a.indexOf(",") !== -1 ? ", ja " : " ja "
    );
  },
  "through": function(a, b) {
    return join_with_shared_prefix(a, b, " kautta ");
  },
  "with": "$1, välillä $2",
  "range": "$1\u2013$2",
  "parenthetical": "$1 ($2)",
  "for-hour": "$1 seuraavan tunnin",
  "starting-in": "$1 alkaa $2",
  "stopping-in": "$1 loppuu $2",
  "starting-then-stopping-later": "$1 alkaa $2, loppuu $3 myöhemmin",
  "stopping-then-starting-later": "$1 alkaa $2, alkaa uudestaan $3 myöhemmin",
  "for-day": "$1 koko päivän",
  "starting": "$1 alkaa $2",
  "until": function(condition, period) {
    return condition + " kunnes " + strip_prefix(period);
  },
  "until-starting-again": function(condition, a, b) {
    return condition + " kunnes " + strip_prefix(a) + ", alkaa uudestaan " + b;
  },
  "starting-continuing-until": function(condition, a, b) {
    return condition + " alkaa" + a + ", jatkuu kunnes " +
           strip_prefix(b);
  },
  "during": "$1 $2",
  "for-week": "$1 koko viikon",
  "over-weekend": "$1 yli viikon",
  "temperatures-peaking": "lämpötilat huipussaan $1 $2",
  "temperatures-rising": "lämpötilat nousevat $1 $2",
  "temperatures-valleying": "lämpötilat alhaisimmillaan $1 $2",
  "temperatures-falling": "lämpötilat laskevat $1 $2",
  /* Capitalize the first letter of every word, except if that word is
   * "and". (This is a very crude bastardization of proper English titling
   * rules, but it is adequate for the purposes of this module.) */
  "title": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  },
  /* Capitalize the first word of the sentence and end with a period. */
  "sentence": function(str) {
    /* Capitalize. */
    str = str.charAt(0).toUpperCase() + str.slice(1);

    /* Add a period if there isn't already one. */
    if(str.charAt(str.length - 1) !== ".")
      str += ".";

    return str;
  }
});
