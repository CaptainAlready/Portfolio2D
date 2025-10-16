import './site.js';
import { Typer } from './typer.js';

const projectsContent = String.raw`
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> cd PanosKapetanidis/Projects<br>
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> ls -1<br><br>
<p class="terminal-paragraph">Explore more repositories on <a class="terminal-link" href="https://github.com/CaptainAlready">GitHub</a>.</p>
<span class="terminal-project">CrossAI</span>
<p class="terminal-paragraph">Led the development of audio data processing and preparation modules, engineering pipelines that transform audio, extract features, and feed TensorFlow deep learning models.</p>
<span class="terminal-project">TheMatrix3DPortfolio</span>
<p class="terminal-paragraph">A personal portfolio inspired by the Matrix desk scene—blending a Three.js and React.js 3D environment with a traditional static website rendered inside a virtual monitor.</p>
<img class="terminal-image terminal-image--gif" src="./assets/img/3DMatrix.gif" alt="Animation of the 3D Matrix portfolio project monitor">
<span class="terminal-project">SimpleSpecAugment</span>
<p class="terminal-paragraph"><a class="terminal-link" href="https://github.com/CaptainAlready/SimpleSpecAugment">Repository link</a> — a concise implementation of SpecAugment using NumPy and functional programming to quickly generate augmented spectrograms without external dependencies.</p>
<img class="terminal-image terminal-image--project" src="./assets/img/spec_augment.png" alt="Visualization of augmented spectrograms produced by SimpleSpecAugment">
`;

const mountTyper = () => {
  const target = document.querySelector('[data-terminal]');
  if (!target) {
    return;
  }

  new Typer(target, {
    text: projectsContent,
    typingDelay: 18,
    chunkSize: 2,
  });
};

document.addEventListener('DOMContentLoaded', mountTyper);
