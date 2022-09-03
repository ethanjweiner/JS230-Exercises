# Buggy Code

The event's default behavior is never prevented. Therefore, when we click on the
`img` element nested inside the `a`, even though the event never fires on `a`
(because of stop propagation), the event's default behavior is still to navigate
to the `href` of the `a`.

The fix is to invoke `Event.preventDefault` on the event before it finishes
propagation

Questions:

- How is the default behavior of an event determiend? Is it really the
  target/event type combo?
