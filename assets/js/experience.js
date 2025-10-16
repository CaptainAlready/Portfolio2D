import './site.js';
import { Typer } from './typer.js';

const experienceContent = String.raw`
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> cd PanosKapetanidis/Experience<br>
<span class="terminal-accent">PanosKapetanidis</span>:<span class="terminal-success">~</span><span class="terminal-secondary">$</span> tail -f ProfessionalExperience.log<br><br>

<span class="terminal-heading">Currently</span>
<p class="terminal-paragraph"><span class="terminal-secondary">Machine Learning / AI Engineer</span> at ML6, Ghent — working on applied AI and data solutions.</p>

<span class="terminal-heading">Work Experience</span>
<ul class="terminal-list">
<li><span class="terminal-date">[2025-10-06] &ndash; now</span><span class="terminal-secondary"> Machine Learning / AI Engineer</span> ML6, Ghent — developing and deploying AI-powered systems and data-driven solutions.</li>
<li><span class="terminal-date">[2023-02-01] &ndash; [2024-02-17]</span><span class="terminal-secondary"> Research Engineer</span> IoT Laboratory, University of Patras — applied machine learning to medical audio data.</li>
</ul>

<span class="terminal-heading">Academic Experience</span>
<ul class="terminal-list">
<li><span class="terminal-date">[2024-09-01] &ndash; [2025-08-01]/span><span class="terminal-secondary"> Student</span> KU Leuven, Belgium — Advanced Masters of Artificial Intelligence</li>
<li><span class="terminal-date">[2018-09-01] &ndash; [2023-07-01]</span><span class="terminal-secondary"> Student</span> University of Patras, Greece — Computer Engineering and Informatics (Diploma)</li>
<li><span class="terminal-date">[2017-09-01] &ndash; [2018-07-01]</span><span class="terminal-secondary"> Student</span> 3rd General Lyceum of Mytilene, Greece</li>
<li><span class="terminal-date">[2016-09-01] &ndash; [2017-07-01]</span><span class="terminal-secondary"> Student</span> Experimental High School of Mytilene, Greece</li>
</ul>

<p class="terminal-paragraph">Complete resume: <a class="terminal-link" href="https://drive.google.com/file/d/1kKmryTIh3CRLiSk02l8IDIgeI84Zn7fx/view">Download CV</a></p>
<p class="terminal-paragraph">Find me on <a class="terminal-link" href="https://www.linkedin.com/in/kapetanidispanagiotis/">LinkedIn</a></p>
`;


const mountTyper = () => {
  const target = document.querySelector('[data-terminal]');
  if (!target) {
    return;
  }

  new Typer(target, {
    text: experienceContent,
    typingDelay: 18,
    chunkSize: 2,
  });
};

document.addEventListener('DOMContentLoaded', mountTyper);
