# C Input Practice With Answers

这份是“题型 -> 用什么输入方式”的练习表。排版尽量短。

## Legend

```text
Best       最推荐
Also works 也能用，但可能更麻烦
Avoid      这题不适合用
```

## Common Rules

| Input shape | Best choice |
| --- | --- |
| one int / many ints | `scanf("%d", &n)` |
| one word | `scanf("%s", word)` |
| one full line with spaces | `fgets` |
| every character, keep spaces/newlines | `getchar` |
| repeat until Ctrl+D | EOF loop |
| repeat until `0` / `-1` | sentinel loop |
| input after `./program` | `argc / argv` |
| function already has array/list | no input |

## Common Templates

### Read One Int

```c
int n;
scanf("%d", &n);
```

Also works:

```c
char line[100];
fgets(line, sizeof line, stdin);
int n = atoi(line);
```

### Read Ints Until Ctrl+D

```c
int n;
while (scanf("%d", &n) == 1) {
    // use n
}
```

Also works if one int per line:

```c
char line[100];
while (fgets(line, sizeof line, stdin) != NULL) {
    int n = atoi(line);
    // use n
}
```

### Read Chars Until Ctrl+D

```c
int c;
while ((c = getchar()) != EOF) {
    // use c
}
```

Also works:

```c
char ch;
while (scanf("%c", &ch) == 1) {
    // use ch
}
```

### Read One Full Line

```c
char line[256];
fgets(line, sizeof line, stdin);
```

Also works, but more annoying:

```c
char line[256];
scanf("%255[^\n]", line);
```

### Read Lines Until Ctrl+D

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    // use line
}
```

### Read Until 0

```c
int n;
while (scanf("%d", &n) == 1 && n != 0) {
    // use n
}
```

Also works:

```c
int n;
scanf("%d", &n);
while (n != 0) {
    // use n
    scanf("%d", &n);
}
```

### Command Line Args

```c
int main(int argc, char *argv[]) {
    int i = 1;
    while (i < argc) {
        int n = atoi(argv[i]);
        // use n
        i++;
    }
    return 0;
}
```

## Practice Table

### Q1: One Integer

```text
./square
5
25
```

Need: read one integer `n`.

| Type | Answer |
| --- | --- |
| Best | `scanf("%d", &n)` |
| Also works | `fgets + atoi` |
| Avoid | `getchar`, because multi-digit numbers are annoying |

Template:

```c
int n;
scanf("%d", &n);
printf("%d\n", n * n);
```

### Q2: Two Integers

```text
./sum
3 7
10
```

Need: read `a` and `b`.

| Type | Answer |
| --- | --- |
| Best | `scanf("%d %d", &a, &b)` |
| Also works | two separate `scanf` calls |
| Also works | `fgets + sscanf` |
| Avoid | `getchar` |

Template:

```c
int a, b;
scanf("%d %d", &a, &b);
printf("%d\n", a + b);
```

### Q3: One Word

```text
./word_length
hello
5
```

Need: read one word, no spaces.

| Type | Answer |
| --- | --- |
| Best | `scanf("%99s", word)` |
| Also works | `fgets`, but it may keep `'\n'` |
| Avoid | `getchar` unless you want to manually build the string |

Template:

```c
char word[100];
scanf("%99s", word);
```

### Q4: One Full Line

```text
./echo_line
Hello, World!
Hello, World!
```

Need: read a sentence with spaces.

| Type | Answer |
| --- | --- |
| Best | `fgets` |
| Also works | `getchar` loop until `'\n'` |
| Also works | `scanf("%[^\n]")`, but awkward |
| Avoid | `scanf("%s")`, because it stops at spaces |

Template:

```c
char line[256];
fgets(line, sizeof line, stdin);
printf("%s", line);
```

### Q5: Integers Until Ctrl+D

```text
./squares
2
4
5
25
```

Need: read many integers until EOF.

| Type | Answer |
| --- | --- |
| Best | `while (scanf("%d", &n) == 1)` |
| Also works | `fgets + atoi` if one int per line |
| Avoid | sentinel loop, because there is no `0` or `-1` stop value |

Template:

```c
int n;
while (scanf("%d", &n) == 1) {
    printf("%d\n", n * n);
}
```

### Q6: Characters Until Ctrl+D

```text
./uppercase
Hello, World!
HELLO, WORLD!
```

Need: process every character, keep spaces and newlines.

| Type | Answer |
| --- | --- |
| Best | `getchar + EOF loop` |
| Also works | `scanf("%c")` loop |
| Also works | `fgets` then loop through each char |
| Avoid | `scanf("%s")`, because it loses spaces/newlines as normal chars |

Template:

```c
int c;
while ((c = getchar()) != EOF) {
    if (c >= 'a' && c <= 'z') {
        c = c - 'a' + 'A';
    }
    putchar(c);
}
```

### Q7: Lines Until Ctrl+D

```text
./line_echo
hello world
hello world
COMP1511 is fun
COMP1511 is fun
```

Need: read many full lines.

| Type | Answer |
| --- | --- |
| Best | `fgets + EOF loop` |
| Also works | `getchar` loop if line boundaries do not matter |
| Avoid | `scanf("%s")`, because lines contain spaces |

Template:

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    printf("%s", line);
}
```

### Q8: Integers Until 0

```text
./until_zero
4
7
2
0
```

Need: read integers until `0`; do not process `0`.

| Type | Answer |
| --- | --- |
| Best | sentinel loop with `scanf` |
| Also works | `scanf` before loop, then `while (n != 0)` |
| Also works | `fgets + atoi` if one int per line |
| Avoid | plain EOF loop, because it must stop at `0` |

Template:

```c
int n;
while (scanf("%d", &n) == 1 && n != 0) {
    // use n
}
```

### Q9: Integers Until -1

```text
./until_minus_one
3
8
-1
```

Need: read integers until `-1`; do not process `-1`.

| Type | Answer |
| --- | --- |
| Best | sentinel loop with `scanf` |
| Also works | `scanf` before loop, then `while (n != -1)` |
| Also works | `fgets + atoi` if one int per line |
| Avoid | plain EOF loop |

Template:

```c
int n;
while (scanf("%d", &n) == 1 && n != -1) {
    // use n
}
```

### Q10: Numbers After Command

```text
./add_args 3 5 7
15
```

Need: read command-line arguments.

| Type | Answer |
| --- | --- |
| Best | `argc / argv` |
| Also works | `strtol(argv[i], NULL, 10)` instead of `atoi` |
| Avoid | `scanf`, because input is already in `argv` |

Template:

```c
int sum = 0;
int i = 1;
while (i < argc) {
    sum += atoi(argv[i]);
    i++;
}
```

### Q11: Array Function

```c
int max_value(int size, int array[size]);
```

Question says no `scanf/getchar/fgets`, no `printf`.

| Type | Answer |
| --- | --- |
| Best | no input; use parameters |
| Also works | `for` loop instead of `while` |
| Avoid | `scanf`, `printf` |

Template:

```c
int max = array[0];
int i = 1;
while (i < size) {
    if (array[i] > max) {
        max = array[i];
    }
    i++;
}
return max;
```

### Q12: Linked List Function

```c
int count_even(struct node *head);
```

Question says no input and no output.

| Type | Answer |
| --- | --- |
| Best | no input; traverse `head` |
| Also works | use `head` directly instead of `curr` |
| Also works | recursion, but usually unnecessary |
| Avoid | `scanf`, `printf` |

Template:

```c
int count = 0;
struct node *curr = head;
while (curr != NULL) {
    if (curr->data % 2 == 0) {
        count++;
    }
    curr = curr->next;
}
return count;
```

### Q13: One Char, Skip Whitespace

Need: read one character, but ignore spaces/newlines before it.

| Type | Answer |
| --- | --- |
| Best | `scanf(" %c", &ch)` |
| Also works | `getchar` loop skipping whitespace |
| Also works | `fgets`, then find first non-space char |
| Avoid | `scanf("%c", &ch)` if newline may be left over |

Template:

```c
char ch;
scanf(" %c", &ch);
```

### Q14: Remove Vowels

```text
./no_vowels
Hello, World!
Hll, Wrld!
```

Need: remove vowels, keep everything else.

| Type | Answer |
| --- | --- |
| Best | `getchar + EOF loop` |
| Also works | `fgets` then loop through chars |
| Also works | `scanf("%c")` loop |
| Avoid | `scanf("%s")` |

Template:

```c
int c;
while ((c = getchar()) != EOF) {
    if (!is_vowel(c)) {
        putchar(c);
    }
}
```

### Q15: Length Then Array

```text
./array_input
5
1 2 3 4 5
```

Need: read `length`, then `length` ints.

| Type | Answer |
| --- | --- |
| Best | `scanf` |
| Also works | `for` loop instead of `while` |
| Also works | `fgets + parsing`, but more complex |
| Avoid | `getchar` |

Template:

```c
int length;
scanf("%d", &length);

int i = 0;
while (i < length) {
    scanf("%d", &array[i]);
    i++;
}
```

### Q16: 3x3 Grid

Need: read 9 ints into `grid[3][3]`.

| Type | Answer |
| --- | --- |
| Best | nested loops + `scanf("%d", &grid[row][col])` |
| Also works | nested `for` loops |
| Also works | one loop `i = 0..8`, use `row = i / 3`, `col = i % 3` |
| Avoid | line-based parsing unless required |

Template:

```c
int row = 0;
while (row < 3) {
    int col = 0;
    while (col < 3) {
        scanf("%d", &grid[row][col]);
        col++;
    }
    row++;
}
```

### Q17: Two Full Lines

```text
hello world
World Hello
```

Need: read two lines with possible spaces.

| Type | Answer |
| --- | --- |
| Best | `fgets` twice |
| Also works | `getchar` until `'\n'` twice |
| Also works | `scanf("%[^\n]")`, but awkward |
| Avoid | `scanf("%s")` |

Template:

```c
char line1[257];
char line2[257];
fgets(line1, sizeof line1, stdin);
fgets(line2, sizeof line2, stdin);
```

### Q18: Prompt Commands Until Ctrl+D

Need: print `# `, then read full command lines until EOF.

| Type | Answer |
| --- | --- |
| Best | `fgets + EOF loop` |
| Also works | `getchar` line builder |
| Avoid | `scanf("%s")` |

Template:

```c
char line[256];
printf("# ");
while (fgets(line, sizeof line, stdin) != NULL) {
    // process line
    printf("# ");
}
```

### Q19: Train Routes In Command Line

```text
./train_routes 2 3 1 2 7 3 3 6 7 1 6
```

Need: all data is after command.

| Type | Answer |
| --- | --- |
| Best | `argc / argv` |
| Also works | `strtol` instead of `atoi` |
| Avoid | `scanf`, `fgets` |

Template:

```c
int i = 1;
while (i < argc) {
    int value = atoi(argv[i]);
    // use value
    i++;
}
```

### Q20: Starter Main Already Reads Input

```c
int first_prime(struct node *head);
```

Need: only write the function.

| Type | Answer |
| --- | --- |
| Best | no input; traverse list |
| Also works | helper function like `is_prime` |
| Avoid | `scanf`, `printf` |

Template:

```c
struct node *curr = head;
while (curr != NULL) {
    if (is_prime(curr->data)) {
        return curr->data;
    }
    curr = curr->next;
}
return -1;
```

## Tiny Difference Table

| Thing | Meaning |
| --- | --- |
| `'\n'` | newline character |
| `EOF` | input ended, often Ctrl+D |
| `scanf(...) == 1` | read 1 item successfully |
| `scanf(...) == 0` | input did not match |
| `NULL` | `fgets` failed or reached EOF |

## Mini Rule Sheet

```text
%d      int
%lf     double
%c      one char, including whitespace
 %c     one char, skipping whitespace
%s      one word, stops at whitespace
fgets   one full line
getchar one character at a time
putchar print one character
EOF     Ctrl+D / input ended
NULL    no line from fgets
argv    command line arguments
```
