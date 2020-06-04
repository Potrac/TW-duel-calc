// ==UserScript==
// @name Duel XP calculator
// @version 0.1
// @author Potrac
// @include	https://*.the-west.*/game.php*
// @include	https://*.tw.innogames.*/game.php*
// @downloadURL https://raw.githubusercontent.com/Potrac/TW-duel-calc/master/tw-duel-calc.js
// ==/UserScript==


(function (fn) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
})(function () {

    let calcDuelExp = (me = 82, opponent = 82, motivation = 100) => {
        const Exp = (7 * opponent - 5 * me + 5) * (motivation / 100);
        const gained = Math.round(Exp) * 3;
        const lost = Math.round(Exp / 3);

        return [gained, Exp, lost];
    }

    let app = () => {
        if( $('.duel-playerduel .dl_leftSide')
            .children('.dl_row')
            .find('span.TW_Dudu').length == 0 ) {
            $('.duel-playerduel .dl_leftSide')
                .children('.dl_row')
                .append("<span class=\"TW_Dudu\" style=\"z-index:1000;position: absolute;right: 0;background: wheat;padding: 5px;\">Click to calculate xp</span>");        
        }

        $('.duel-playerduel .dl_leftSide').children('.dl_row').click(function(){
          let level = $(this).children('.dl_player_box')
                      .children('.dln_npc_content')
                     .children('.dlp_level').text();
          level = parseInt(level.replace ( /[^\d.]/g, '' ));
          
          const me = Character.duelLevel;
          let opponent = level;
          let motivation = Character.duelMotivation * 100;
          let xp_calculation = calcDuelExp(me, opponent);
          
          $(this).children('.TW_Dudu').text(xp_calculation[0]);
        });
    }

    $(document).ready(function () {
        console.log('TW_Dudu_calculator launch');
        console.log(Character.duelMotivation * 100);
        app();
        setInterval(app, 2000);
    });
});
