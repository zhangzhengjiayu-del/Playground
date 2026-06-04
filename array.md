# Array

## 1D Array 核心考点

1. 遍历数组

```c
for (int i = 0; i < size; i++) {
    // use arr[i]
}
```

2. 计数类
- 统计偶数个数
- 统计正数个数
- 统计满足条件的元素个数

3. 最值类
- 找最小值
- 找最大值
- 找最值对应下标

4. 查找类
- 判断某个值是否存在
- 找到后提前 `return`

5. 比较判断类
- 是否全相同
- 是否递增

6. 累加类
- 求和
- 判断和是否为 0

7. 条件过滤类
- 只处理小写字母
- 只统计正数

## String / Char Array 考点

1. 字符串遍历

```c
for (int i = 0; str[i] != '\0'; i++) {
    // use str[i]
}
```

2. ASCII 判断

```c
c >= 'a' && c <= 'z'
```

3. 字符统计
- 统计元音
- 统计小写字母
- 统计重复字符

4. 条件过滤后再处理
- 找最小 lowercase
- 统计某类字符数量

## 2D Char Array / 字符串数组

1. 基本写法

```c
char arr[][100]
```

2. 常考任务
- 对每个字符串分别统计
- 比较多个字符串的统计结果
- 判断所有字符串是否满足同一条件

## 必背模板

1. 遍历数组

```c
for (int i = 0; i < size; i++) {
    // use arr[i]
}
```

2. 条件计数

```c
if (condition) {
    count++;
}
```

3. 最值更新

```c
if (arr[i] < min) {
    min = arr[i];
}
```

4. 字符串遍历

```c
for (int i = 0; str[i] != '\0'; i++) {
}
```

## 高频易错点

1. 忘记初始化

```c
int min = arr[0];
```

2. 忘记考虑 `size == 0`

3. 字符比较写错

```c
'a' <= c <= 'z'   // wrong
c >= 'a' && c <= 'z'   // correct
```

4. 越界
- 比如判断递增时要注意 `i < size - 1`

5. 把值和下标混掉

## 同级 1D Array 练习题

```c
int min_value(int arr[], int size);
int count_even(int arr[], int size);
char min_lowercase(char arr[], int size);
int all_same(int arr[], int size);
int exists(int arr[], int size, int target);
int sum_zero(int arr[], int size);
int max_index(int arr[], int size);
int count_positive(int arr[], int size);
int is_increasing(int arr[], int size);
int count_vowels(char str[]);
int same_vowel_count(char arr[][100], int size);
```

## Q9 / 3 dots 题核心

Q9 这类题本质上通常是：

- 字符串
- 双循环
- 条件判断
- 不能依赖复杂库函数

通用理解：

```c
for (int i = 0; s[i] != '\0'; i++) {
    for (int j = 0; s[j] != '\0'; j++) {
        if (/* condition */) {
            // update answer
        }
    }
}
```

## Q9 同 level 例子

### 类型 1：比较两个字符串

```c
int share_letter(char s1[], char s2[]);
int count_common_chars(char s1[], char s2[]);
int is_rotation(char s1[], char s2[]);
char first_common_char(char s1[], char s2[]);
```

### 类型 2：对每个字符做分析

```c
void count_larger_after(char s[], int result[]);
void count_same_before(char s[], int result[]);
void appears_again(char s[], int result[]);
void char_frequency(char s[], int result[]);
```

### 类型 3：位置关系类

```c
int is_increasing_str(char s[]);
int has_double(char s[]);
int longest_run(char s[]);
int is_palindrome(char s[]);
```

### 类型 4：过滤后再比较

```c
int count_lowercase(char s[]);
char min_lowercase(char s[]);
int count_vowels(char s[]);
int same_vowel_count(char s1[], char s2[]);
```

### 类型 5：最像 Q9 的双循环题

```c
int count_equal_pairs(char s[]);
int count_repeated_letters(char s[]);
int has_duplicate(char s[]);
void count_different_chars(char s[], int result[]);
```

## Q9 最值得优先练的题

```c
int is_rotation(char s1[], char s2[]);
int count_common_chars(char s1[], char s2[]);
void count_larger_after(char s[], int result[]);
void appears_again(char s[], int result[]);
void char_frequency(char s[], int result[]);
int has_duplicate(char s[]);
int longest_run(char s[]);
int same_vowel_count(char s1[], char s2[]);
```

## 做 Q9 时先问自己

1. 外层循环在枚举谁
- 通常是当前字符 `s[i]`

2. 内层循环在和谁比较
- 通常是别的字符 `s[j]`

3. 这题最后要记录什么
- 计数
- 下标
- 真或假
- 结果数组
