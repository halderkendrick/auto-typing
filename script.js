const textEl = document.getElementById("text");
const speedEl = document.getElementById("speed");

const code = `#include <stdio.h>

int main()
{
    printf("Hello World");

    return 0;
}
`;

let index = 1;
let speed = 300 / speedEl.value;

function highlight(text) {
    // escape < >
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // syntax highlight
    return text
        .replace(/#include &lt;stdio.h&gt;/g,
            '<span class="include">#include &lt;stdio.h&gt;</span>')
        .replace(/\bint\b|\breturn\b/g,
            '<span class="keyword">$&</span>')
        .replace(/\bmain\b|\bprintf\b/g,
            '<span class="func">$&</span>')
        .replace(/"Hello World"/g,
            '<span class="string">"Hello World"</span>')
        .replace(/\b0\b/g,
            '<span class="number">0</span>');
}

function typeEffect() {
    const currentText = code.slice(0, index);
    textEl.innerHTML = highlight(currentText);
    index++;

    if (index > code.length) {
        index = 1; // loop typing
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

speedEl.addEventListener("input", () => {
    speed = 300 / speedEl.value;
});
