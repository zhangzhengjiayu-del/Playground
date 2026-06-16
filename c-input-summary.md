# C Input Summary

这份总结覆盖 COMP1511 常见输入方式：`scanf`、`getchar`、`fgets`、EOF / Ctrl+D、结束标记、命令行参数，以及函数题里“不需要自己读输入”的情况。

## 快速选择

```text
读 int / double / char / 单词       -> scanf
读整行，包含空格                   -> fgets
逐字符处理，保留空格换行           -> getchar
读到 Ctrl+D                        -> while (... != EOF / != NULL)
读到 0、-1 这种结束值              -> sentinel loop
./program 后面跟参数               -> argc / argv
函数题参数已经给你                 -> 不要 scanf
```

## scanf 基本用法

`scanf` 用来读格式化输入，比如整数、字符、浮点数、一个单词。

```c
int n;
scanf("%d", &n);
```

常用格式：

```c
%d      // int
%lf     // double
%c      // char，会读空格和换行
 %c     // 前面加空格，跳过空白后读一个字符
%s      // 字符串单词，遇到空格或换行停止
```

读多个整数：

```c
int a, b;
scanf("%d %d", &a, &b);
```

读数组长度和数组：

```c
int length;
scanf("%d", &length);

int numbers[100];
int i = 0;
while (i < length) {
    scanf("%d", &numbers[i]);
    i++;
}
```

注意：

- 读 `int`、`double`、`char` 变量时通常要加 `&`。
- 读字符串数组时不用加 `&`，因为数组名本身就是地址。
- `%s` 只能读一个单词，不适合读 `Hello, World!` 这种含空格的整行。

## scanf 读字符串

```c
char word[100];
scanf("%99s", word);
```

`%99s` 的意思是最多读 99 个字符，留 1 个位置给字符串结尾的 `'\0'`。

如果输入是：

```text
Hello, World!
```

`scanf("%s", word)` 只会读到：

```text
Hello,
```

因为 `%s` 遇到空格就停止。

## getchar 逐字符读取

`getchar()` 每次读一个字符，适合过滤字符、统计字符、保留空格和换行。

```c
int c;
while ((c = getchar()) != EOF) {
    // use c
}
```

为什么用 `int c`，不是 `char c`：

- `getchar()` 返回字符，也可能返回 `EOF`。
- `EOF` 不是普通字符，所以需要用 `int` 保存。

## no_vowels 例子

需求：

```text
./no_vowels
Hello, World!
Hll, Wrld!
```

一直处理输入，直到用户按 `Ctrl+D`。

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

这里不能用 `scanf("%s", str)`，因为它会把空格后面的内容分开读。`getchar()` 会把 `Hello, World!` 里的空格、逗号、感叹号、换行都照常读进来。

## fgets 读一整行

`fgets` 用来读整行，包含空格。

```c
char line[256];
fgets(line, sizeof line, stdin);
```

循环读多行，直到 `Ctrl+D`：

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    printf("Input received: %s", line);
}
```

注意：

- `fgets` 通常会把行尾的 `'\n'` 也读进去。
- 如果你再 `printf("%s", line)`，通常不需要额外加 `\n`。

## 读到 Ctrl+D / EOF

`Ctrl+D` 表示 end-of-file，也就是 EOF。它不是一个真正读进来的字符。

用 `scanf` 读到 EOF：

```c
int n;
while (scanf("%d", &n) == 1) {
    printf("%d\n", n);
}
```

用 `getchar` 读到 EOF：

```c
int c;
while ((c = getchar()) != EOF) {
    putchar(c);
}
```

用 `fgets` 读到 EOF：

```c
char line[256];
while (fgets(line, sizeof line, stdin) != NULL) {
    printf("%s", line);
}
```

## 读到结束标记

有些题不是读到 `Ctrl+D`，而是读到某个特殊值，比如 `0` 或 `-1`。

读整数直到 `0`：

```c
int n;
while (scanf("%d", &n) == 1 && n != 0) {
    // use n
}
```

读整数直到 `-1`：

```c
int n;
while (scanf("%d", &n) == 1 && n != -1) {
    // use n
}
```

如果题目说 final `0` / final `-1` 不要处理，就在循环条件里排除它。

## 读一行或两行字符串

读一行：

```c
char line[256];
fgets(line, sizeof line, stdin);
```

读两行：

```c
char line1[257];
char line2[257];

fgets(line1, sizeof line1, stdin);
fgets(line2, sizeof line2, stdin);
```

如果题目说每行最多 256 个字符，数组通常开 `257`，因为需要多一个位置放 `'\0'`。

## 命令行参数 argc / argv

如果运行方式是：

```bash
./prac_q1 2 4 6 - 1 2 3
```

这些不是从 `scanf` 读的，而是命令行参数。

```c
int main(int argc, char *argv[]) {
    int i = 1;
    while (i < argc) {
        printf("argv[%d] = %s\n", i, argv[i]);
        i++;
    }
    return 0;
}
```

`argc` 是参数数量，`argv` 是字符串数组。

```text
argv[0] -> 程序名，比如 ./prac_q1
argv[1] -> 第一个真正参数
argv[2] -> 第二个真正参数
```

把参数转成整数：

```c
#include <stdlib.h>

int value = atoi(argv[i]);
```

很多链表题 starter `main` 会帮你把命令行参数转换成 linked list，所以你只写函数，不需要自己读输入。

## 函数题不要自己 scanf

如果题目写：

```text
function is given an array
function is given a linked list
function should not call scanf/getchar/fgets
function should not print anything
```

意思是：输入已经作为参数传进来了，你只处理参数并 `return` 结果。

例子：

```c
int count_neutral_rows(int size, int array[4][size]) {
    int count = 0;

    int row = 0;
    while (row < 4) {
        int sum = 0;
        int col = 0;
        while (col < size) {
            sum += array[row][col];
            col++;
        }

        if (sum == 0) {
            count++;
        }

        row++;
    }

    return count;
}
```

这里不要 `scanf`，不要 `printf`。

## 文本里出现过的输入类型

你贴的 prac exam 文本里主要有这些：

1. 命令行参数：例如 `./prac_q1 2 4 6 - 1 2 3`。
2. 标准输入读整数：例如输入一个 `n`、读 9 个 `int`、读数组长度后读数组。
3. 标准输入读到结束标记：例如读整数直到 `0`，或读链表/牌直到 `-1`。
4. 标准输入读到 `Ctrl+D` / EOF：例如反复读字符串、反复读整数算 factorial。
5. 读一行字符串：例如 `prac_q9` 读 single line。
6. 读两行字符串：例如统计两行里共同出现的字母。
7. 交互式命令循环：例如每次先打印 `#`，然后读一整行命令，直到 EOF。
8. 函数参数输入：很多题不允许 `scanf/getchar/fgets`，因为数据已经通过函数参数、数组或链表传进来了。

## 常见坑

`scanf("%c", &ch)` 会读到上一次输入留下的换行。通常写：

```c
scanf(" %c", &ch);
```

`scanf("%s", str)` 不能读空格。如果要读整句，用 `fgets` 或 `getchar`。

`fgets` 会保留换行。如果需要去掉换行，可以手动处理：

```c
int i = 0;
while (line[i] != '\0') {
    if (line[i] == '\n') {
        line[i] = '\0';
    }
    i++;
}
```

不要混用 `scanf` 和 `fgets` 时忘记处理残留换行。例如先 `scanf("%d", &n)`，再 `fgets(line, ...)`，`fgets` 可能会读到整数后面的那一个换行。

解决方式之一：

```c
scanf("%d", &n);
getchar(); // consume leftover '\n' when input format is simple
fgets(line, sizeof line, stdin);
```

考试里如果题目明确说输入格式简单、无需 error checking，就可以写直接一点。
