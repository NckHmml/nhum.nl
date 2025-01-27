import SyntaxHighlighter from "react-syntax-highlighter";
import { Link, Outlet } from "react-router-dom";
import I18N from "../components/i18n";

export const ConceptsBots: React.FC = () => (
  <>
    <Link to="/concepts"><I18N>nav.back</I18N></Link>
    <h2><I18N>concepts.bots</I18N></h2>
    <p><I18N>concepts.bots.description</I18N></p>
    <h3>The problem</h3>
    <p>
      The main problem we encountered here was, we couldn't endlessly keep blocking the bots, because there's always a way for them to act like they are legits user of our public API. It will just end up being a cat and mouse game.
      <br />
      But we couldn't leave it like it was either, because now a good 90% of the load came from bots. We couldn't block the API itself either, because not only where legit users using it, our home page was using this API too.
      <br />
      So how can we reduce the amount of calls from bots, without impacting our users?
    </p>
    <h3>The solution</h3>
    <p>
      What is the easiest way to prevent the bots from using our API? Obviously you can try and block them, or use some WAF rules to filter them out. But as mentioned before, this was the first thing we tried, and it was not working as well as hoped.
      <br />
      Then one day it came to us, just like insects, rather than exterminating these "bugs", how can we make the environment less attractive to them?
      <br />
      The answer? Hit them were it hurts, financially.
    </p>
    <p>
      In a certain way, we created a perfect environment for these bots to run, not only provided our API data that they wanted, it was fast too, really fast.
      <br />
      Of course, now you can say "why not just slow the API down then?", well... we tried, and the result is that they will just do more requests spread out of a large range of IP adressen, in the end, only costing us more money.
      <br />
      So how can we slow it down for them, but not incur anymore costs on our side. Because our goal is the opposite, to raise their running cost.
    </p>
    <SyntaxHighlighter language="json">{`{
  "algorithm": "sha512-hmac",
  "nonce": "c13223",
  "challenge": "67e133"
}`}</SyntaxHighlighter>
    <p>
      At first the above example might look confusing, the idea behind this, is that every request needs solve a "challenge", a cryptographic one.
      <br />
      The challenge is actually relatively simple, find out what value together with the "nonce" (short for not once) would be the answer which is in "challenge". But while simple, in the above example, which is only using 6 digits, it could mean in the worst cause it has to run this algorithm 256^3 times, that is a 16777216 times!
      <br />
      While hashing is relatively fast, doing it several million times can take quite some time. However if you know the answer, it is really fast to check whether the answer is correct. For example, the correct answer here is "608ec2", so if you were to try and guess this, it would take you roughly 6 million tries.
    </p>
    <p>
      Of course, using a 6 digit challenge might slow down the users on a browser down too much, but the nice thing of this approach is, is that it can be modified while running. If you reduce the length of the challenge, the time required to guess drops.
      <br />
      Additionally, if you use the answer from the last challenge, and use that for the next one, you would be able to enforce a synchronous session. While this wouldn't bother a bot too much, it does add the need for additional memory to deal with this (not for storing the hashes, but for having to manage the sessions). Thus costing the owner of the bots even more money.
      <br />
      Implementing this caused a great reduction in the amounts of bots we saw, quite simply because if you spend most of your time solving hashes, you might as well just mine bitcoins.
    </p>
  </>
);

export const ConceptsPassword: React.FC = () => (
  <>
    <Link to="/concepts"><I18N>nav.back</I18N></Link>
    <h2><I18N>concepts.password</I18N></h2>
    <p><I18N>concepts.password.description</I18N></p>
    <p>
      We all have been in this situation, "your password most contain at least one capital, a number, etc...". But does this really make your password more secure? Or does it just make your password harder to remember?
      <br />
      Of course, the best solution is to have a password manager, but these are not completely foolproof either. A unique password with either a second or maybe even a third authentication step would also be the most secure.
    </p>
    <p>
      A good example that happened to me, for an application we need the users to register a 6 digit PIN code. However, somebody made a policy for these PIN codes that what something like this: "No dates (YYYYMM, MMYYYY, MMDDYY, DDMMYY, etc.), No sequential numbers, No keyboard patterns, No username (we used number based users)" and some more requirements. 
      <br />
      The end result? More than 60% of the numbers between 000000-999999 were not allowed.
      <br />
      So in the end not only was this a potential big nuisance to the users, it also made brute-forcing the PIN codes a lot easier because only 40% of the 6 digit PIN codes were left.
    </p>
    <h3>Conclusion</h3>
    <p>
      Beside educating users on what a good password or PIN is, we also need to be aware that creating difficult requirements might end up causing the opposite effect. Because when something is hard to remember, people might employ tricks to "remember" their password (e.g. putting it a post-it)
      <br />
      Therefore, fewer requirements might actually increase the security of a password or PIN
    </p>
    <a href="https://xkcd.com/936/" target="_blank">https://xkcd.com/936/</a>
    <a href="https://xkcd.com/936/" target="_blank"><img src="https://imgs.xkcd.com/comics/password_strength.png" alt="XKCD cartoon number 936" /></a>
  </>
);

export const ConceptsSearch: React.FC = () => (
  <>
    <Link to="/concepts"><I18N>nav.back</I18N></Link>
    <h2><I18N>concepts.search</I18N></h2>
    <p><I18N>concepts.search.description</I18N></p>
  </>
);

export const ConceptsIndex: React.FC = () => (
  <>
    <h2><I18N>concepts.bots</I18N></h2>
    <p><I18N>concepts.bots.description</I18N></p>
    <Link to="/concepts/bots"><I18N>concepts.goto</I18N></Link>
    <h2><I18N>concepts.password</I18N></h2>
    <p><I18N>concepts.password.description</I18N></p>
    <Link to="/concepts/password"><I18N>concepts.goto</I18N></Link>
    {/* <h2><I18N>concepts.search</I18N></h2>
    <p><I18N>concepts.search.description</I18N></p>
    <Link to="/concepts/search"><I18N>concepts.goto</I18N></Link> */}
  </>
);

export const Concepts: React.FC = () => (
  <>
    <h1><I18N>concepts.title</I18N></h1>
    <p><I18N>concepts.description</I18N></p>
    <Outlet />
  </>
);