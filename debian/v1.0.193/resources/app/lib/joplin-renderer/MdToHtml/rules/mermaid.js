"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addContextAssets(context) {
    if ('mermaid' in context.pluginAssets)
        return;
    context.pluginAssets['mermaid'] = [
        { name: 'mermaid.min.js' },
        { name: 'mermaid_render.js' },
        {
            inline: true,
            // Note: Mermaid is buggy when rendering below a certain width (500px?)
            // so set an arbitrarily high width here for the container. Once the
            // diagram is rendered it will be reset to 100% in mermaid_render.js
            text: '.mermaid { background-color: white; width: 640px; }',
            mime: 'text/css',
        },
    ];
}
// @ts-ignore: Keep the function signature as-is despite unusued arguments
function installRule(markdownIt, mdOptions, ruleOptions, context) {
    const defaultRender = markdownIt.renderer.rules.fence || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options, env, self);
    };
    markdownIt.renderer.rules.fence = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        if (token.info !== 'mermaid')
            return defaultRender(tokens, idx, options, env, self);
        addContextAssets(context);
        return `<div class="mermaid">${token.content}</div>`;
    };
}
function default_1(context, ruleOptions) {
    return function (md, mdOptions) {
        installRule(md, mdOptions, ruleOptions, context);
    };
}
exports.default = default_1;
