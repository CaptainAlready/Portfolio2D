import './site.js';
import { Typer } from './typer.js';

const aboutContent = String.raw`
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> cd PanosKapetanidis/About<br>
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> cat About.txt<br><br>
<p class="terminal-paragraph">Welcome!</p>
<img class="terminal-image terminal-image--profile" src="./assets/img/panosai.png" alt="Stylized portrait of Panos Kapetanidis">
<p class="terminal-paragraph">My name is Panos Kapetanidis. I was born in Heidelberg, raised in Luxembourg, and completed high school on the island of Lesbos in Greece.</p>
<p class="terminal-paragraph">Currently I am a AI/ML Engineer at ML6, Ghent. Prior to this, I worked as a Research Engineer on Machine Learning applied on Medical/Pharma data. Regarding my education: I received my Master's in Artificial Intelligence at KU Leuven, Belgium and also hold a diploma in Computer Engineering and Informatics at the University of Patras.</p>
<p class="terminal-paragraph">Beyond engineering, jazz manouche guitar and the double bass keep me curious. You can find our band, Manouchedrome, playing very often in Brussels, Ghent and beyond.</p>
<img class="terminal-image terminal-image--gif" src="./assets/img/double_bass.gif" alt="Looping animation of a double bass illustration">
<p class="terminal-paragraph">Nerdy stuff aside, I enjoy doing calisthenics, a form of exercise that combines strength and flexibility training using bodyweight movements.</p>
`;

const mountTyper = () => {
  const target = document.querySelector('[data-terminal]');
  if (!target) {
    return;
  }

  new Typer(target, {
    text: aboutContent,
    typingDelay: 20,
    chunkSize: 2,
  });
};

document.addEventListener('DOMContentLoaded', mountTyper);
