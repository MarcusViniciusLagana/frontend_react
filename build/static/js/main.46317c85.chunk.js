(this.webpackJsonpfrontend_react=this.webpackJsonpfrontend_react||[]).push([[0],{11:function(e,t,i){"use strict";i.r(t);var a=i(4),c=i(5),s=i(6),n=i(7),r=i(10),l=i(9),o=i(0),u=i(1),h=i.n(u),d=i(8),m=i.n(d);i(17);function f(e){return Object(o.jsx)("button",{className:"square",onClick:e.click,children:e.value})}function j(e){return Object(o.jsxs)("div",{className:"board-row",children:[Object(o.jsx)(f,{value:e.value[0],click:function(){return e.click(0)}}),Object(o.jsx)(f,{value:e.value[1],click:function(){return e.click(1)}}),Object(o.jsx)(f,{value:e.value[2],click:function(){return e.click(2)}})]})}function g(e){return Object(o.jsx)("div",{className:"game-board",children:Object(o.jsxs)("div",{children:[Object(o.jsx)(j,{value:e.squares.slice(0,3),click:function(t){return e.click(t)}}),Object(o.jsx)(j,{value:e.squares.slice(3,6),click:function(t){return e.click(3+t)}}),Object(o.jsx)(j,{value:e.squares.slice(6,9),click:function(t){return e.click(6+t)}})]})})}function v(e){var t=['Tic-tac-toe is called "Jogo da Velha" in Brazil, something that could be translated as "The Game of the Old Woman"','If the result is a tie, in Brazil, we call it "Velha" or "Old Woman" (free translation)','This game allows 91 distinct victories positions for "X", 44 for "O", and only 3 distinct draw positions',"If played optimally by both players, the game always ends in a draw","In 1975, tic-tac-toe was used by MIT students to demonstrate the computational power of Tinkertoy elements."];return Object(o.jsx)("div",{className:"fact",children:t[Math.floor(Math.random()*t.length)]})}function p(e){var t=["https://media.giphy.com/media/jTemXLGfONHenS1icE/source.gif","https://media.giphy.com/media/133R3yNyjDea0U/source.gif","https://media.giphy.com/media/l2SpUXr2q90X1Pqgw/source.gif","https://media.giphy.com/media/Pnfb50o1UuTagM3KMG/source.gif","https://media.giphy.com/media/26AHvcW0LBkohdWJa/giphy.gif","https://media.giphy.com/media/83eQIMgNvkiY/giphy.gif","https://media.giphy.com/media/ugyC0Q2BoCbYs/giphy.gif","https://media.giphy.com/media/3oz8xTwbLrC75weLeM/giphy.gif","https://media.giphy.com/media/JTE9xUEh90wheAAnPN/giphy.gif","https://media.giphy.com/media/mJzJSSrhNJGEJ8GYrH/giphy.gif","https://media.giphy.com/media/RMk32NEpSgcIoljwwz/giphy.gif","https://media.giphy.com/media/l0HU8MLXSjDXkEUGk/giphy.gif"],i=0,a=t.length,c=a/3;"X"===e.nextMove?a=c:"O"===e.nextMove?(i=c,a-=c):i=a-c;var s=Math.floor(Math.random()*(a-i)+i);return Object(o.jsx)("img",{alt:"",src:t[s]})}var b=function(e){Object(r.a)(i,e);var t=Object(l.a)(i);function i(e){var a;return Object(s.a)(this,i),(a=t.call(this,e)).state={nextMove:"X",squares:Array(9).fill(null)},a}return Object(n.a)(i,[{key:"restartGame",value:function(){this.setState({nextMove:"X",squares:Array(9).fill(null)})}},{key:"checkDrawWinner",value:function(){var e,t=this.state.squares,i=!0,s=!1,n=null,r=Object(c.a)(this.props.lines);try{for(r.s();!(e=r.n()).done;){var l=Object(a.a)(e.value,3),o=l[0],u=l[1],h=l[2],d=[t[o],t[u],t[h]],m=d.filter((function(e){return"X"===e})).length,f=d.filter((function(e){return"O"===e})).length;if(0!==m&&0!==f||(i=!1),3===m||3===f){s=!0,n=3===m?"X":"O";break}}}catch(j){r.e(j)}finally{r.f()}return[s||i,n]}},{key:"squareClick",value:function(e){var t=this.state.squares;if(!t[e]&&!this.checkDrawWinner()[0]){var i="X"===this.state.nextMove?"O":"X";t[e]=this.state.nextMove,this.setState({nextMove:i,squares:t})}}},{key:"render",value:function(){var e=this,t=this.checkDrawWinner(),i=Object(a.a)(t,2),c=i[0],s=i[1];return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"title",children:"Jogo da Velha / Tic-tac-toe"}),Object(o.jsxs)("div",{className:"game-area",children:[Object(o.jsxs)("div",{className:"game",children:[Object(o.jsx)(g,{squares:this.state.squares,click:function(t){return e.squareClick(t)}}),Object(o.jsxs)("div",{className:"game-info",children:[c?s?"Winner:":"Draw / Deu Velha!":"Next Move:",Object(o.jsx)("br",{}),Object(o.jsx)(p,{nextMove:c?s:this.state.nextMove})]})]}),Object(o.jsx)("div",{className:"restart",children:Object(o.jsx)("button",{className:"restart-button",onClick:function(){return e.restartGame()},children:"Restart Game"})}),Object(o.jsx)(v,{})]})]})}}]),i}(h.a.Component);m.a.render(Object(o.jsx)(b,{lines:[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]}),document.getElementById("root"))},17:function(e,t,i){}},[[11,1,2]]]);
//# sourceMappingURL=main.46317c85.chunk.js.map