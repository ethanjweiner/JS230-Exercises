# Child Nodes

Question: How many direct/indirect child nodes does each parent node have?

Definitions:

1. _Parent_: Any node that has at least one child
2. _Indirect Child Node_: Child nodes of child nodes (etc.)

Node tree:

```
Key: * = empty space
               ...
                |
               div
             /  |   \   \
          *h1*  p*   a* div*
          / |  / | \  \   \
        tx em tx sp tx st  p
            |    |     |   |
           tx    tx    tx  a
                           |
                           tx
```

1. 21 (9, 12)
2. 3 (2, 1)
3. 1 (1, 0)
4. 4 (3, 1)
5. 1 (1, 0)
6. 2 (1, 1)
7. 1 (1, 0)
8. 3 (1, 2)
9. 1 (1, 1)
10. 1 (1, 0)

```js

```
