#include <common>

uniform vec3 iResolution;
uniform vec3 iScale;
uniform float iTime;
uniform sampler2D iChannel0;

/*

A quick experiment with rain drop ripples.

This effect was written for and used in the launch scene of the
64kB PC intro "H - Immersion", by Ctrl-Alt-Test.

 > http://www.ctrl-alt-test.fr/productions/h-immersion/
 > https://www.youtube.com/watch?v=27PN1SsXbjM

-- 
Zavie / Ctrl-Alt-Test

*/

// Maximum number of cells a ripple can cross.
#define MAX_RADIUS 2

#define HASHSCALE1 .1031
#define HASHSCALE2 vec2(.1031, .0973)

float hash12(vec2 p) {
    p = fract(p * HASHSCALE1);
    p += dot(p, p.yx + 19.19);
    return fract((p.x + p.y) * p.x);
}

vec2 hash22(vec2 p) {
    p = fract(p * HASHSCALE2);
    p += dot(p, p.yx + 19.19);
    return fract(p * p.yx);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float resolution = 10. * exp2(-3. * iScale.x / iResolution.x);
    float uvx = iResolution.y * 4. / 3.; // Retain 4:3 ratio
    vec2 uv = fragCoord.xy / vec2(uvx, iResolution.y) * resolution;
    vec2 p0 = floor(uv);

    vec2 circles = vec2(0.);
    for(int j = -MAX_RADIUS; j <= MAX_RADIUS; ++j) {
        for(int i = -MAX_RADIUS; i <= MAX_RADIUS; ++i) {
            vec2 pi = p0 + vec2(i, j);
            vec2 p = pi + hash22(pi);

            float t = fract(0.1 * iTime + hash12(p) * 1.);
            vec2 v = p - uv;
            float d = length(v) - (float(MAX_RADIUS) + 1.) * t;

            float h = 1e-3;
            float d1 = d - h;
            float d2 = d + h;
            float sm = smoothstep(-0.6, -0.3, d1) * smoothstep(0., -0.3, d1);
            float p1 = sin(31. * d1) * sm;
            float p2 = sin(31. * d2) * sm;
            circles += 0.5 * normalize(v) * ((p2 - p1) / (2. * h) * (1. - t) * (1. - t));
        }
    }
    circles /= float((MAX_RADIUS * 2 + 1) * (MAX_RADIUS * 2 + 1));

    float intensity = mix(0.1, 0.15, smoothstep(0.1, 0.6, abs(fract(0.1 * iTime + 0.5) * 2. - 1.)));
    vec3 n = vec3(circles, sqrt(1. - dot(circles, circles)));
    vec3 color = texture(iChannel0, uv / resolution - intensity * n.xy).rgb;
    color += 5. * pow(clamp(dot(n, normalize(vec3(1., 0.7, 0.5))), 0., 1.), 6.);
    fragColor = vec4(color, 1.);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}