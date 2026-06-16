# C Input Summary

## Quick Pick

```text
int / double / one word       -> scanf
one full line                 -> fgets
one char at a time            -> getchar
until Ctrl+D                  -> EOF loop
until 0 or -1                 -> sentinel loop
after ./program               -> argc / argv
function already has data     -> no input
```

## scanf

Use `scanf` for formatted input.

```c
int n;
scanf("%d", &n);
```

Common formats:

```text
%d      int
%lf     double
%c      char, can read '\n'
 %c     char, skips whitespace first
%s      one word
```

Read two ints:

```c
int a, b;
scanf("%d %d", &a, &b);
```

Read one word:

```c
char word[100];
scanf("%99s", word);
```

Important:

```text
scanf("%s") stops at space or '\n'
scanf("%d") skips spaces and '\n'
scanf("%c") reads the next char, even '\n'
scanf(" %c") skips spaces and '\n', then reads a char
```

## getchar

Use `getchar` when you need every character.

```c
int c;
while ((c = getchar()) != EOF) {
    putchar(c);
}
```

Use `int`, not `char`, because `getchar()` can return `EOF`.

`getchar()` reads:

```text
letters
spaces
punctuation
'\n'
```

## putchar

Use `putchar` to print one character.

```c
putchar('A');
putchar('\n');
```

Example: remove vowels.

```c
#include <stdio.h>

int is_vowel(int c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
           c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
}

int main(void) {
    int c;

    while ((c = getchar()) != EOF) {
        if (!is_vowel(c)) {
            putchar(c);
        }
    }

    return 0;
}
```

Input:

```text
Hello, World!
```

Output:

```text
Hll, Wrld!
```

## fgets

Use `fgets` for a whole line.

```c
char line[256];
fgets(line, sizeof line, stdin);
```

Read lines until `Ctrl+D`:

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    printf("%s", line);
}
```

Important:

```text
fgets keeps '\n' if there is space in the array
fgets returns NULL at EOF
```

## EOF / Ctrl+D

`Ctrl+D` means EOF.

EOF is:

```text
not '\n'
not 0
not NULL
not a normal character
```

With `scanf`:

```c
int n;
while (scanf("%d", &n) == 1) {
    printf("%d\n", n);
}
```

`scanf` return values:

```text
1      read 1 item successfully
0      input did not match
EOF    input ended
```

With `getchar`:

```c
int c;
while ((c = getchar()) != EOF) {
    putchar(c);
}
```

With `fgets`:

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    printf("%s", line);
}
```

## Sentinel Loop

Use this when input stops at a special value.

Until `0`:

```c
int n;
while (scanf("%d", &n) == 1 && n != 0) {
    // use n
}
```

Until `-1`:

```c
int n;
while (scanf("%d", &n) == 1 && n != -1) {
    // use n
}
```

The final `0` or `-1` is not used.

## argc / argv

Use this when input is after the command.

```text
./program 3 5 7
```

Template:

```c
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    int i = 1;
    while (i < argc) {
        int n = atoi(argv[i]);
        printf("%d\n", n);
        i++;
    }

    return 0;
}
```

Meaning:

```text
argc     number of arguments
argv[0]  program name
argv[1]  first real argument
argv[2]  second real argument
```

## Function Questions

If the question says:

```text
should not call scanf/getchar/fgets
should not print anything
```

Then do not read input.

Use the function parameters.

Example:

```c
int max_value(int size, int array[size]) {
    int max = array[0];

    int i = 1;
    while (i < size) {
        if (array[i] > max) {
            max = array[i];
        }
        i++;
    }

    return max;
}
```

## Tiny Cheat Sheet

```text
scanf("%d", &n)          read int
scanf("%lf", &x)         read double
scanf("%99s", word)      read one word
scanf(" %c", &ch)        read one char, skip whitespace
getchar()                read one char, including '\n'
putchar(c)               print one char
fgets(line, size, stdin) read one full line
EOF                      Ctrl+D / input ended
NULL                     no line from fgets
argc / argv              command line input
```
