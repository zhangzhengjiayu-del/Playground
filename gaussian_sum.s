########################################################################
# A simple MIPS program that calculates the Gaussian sum between two numbers

        .text
        .globl main
main:
        # printf("Enter first number: ");
        li      $v0, 4
        la      $a0, prompt1
        syscall

        # scanf("%d", &number1);
        li      $v0, 5
        syscall
        move    $t0, $v0        # t0 = number1

        # printf("Enter second number: ");
        li      $v0, 4
        la      $a0, prompt2
        syscall

        # scanf("%d", &number2);
        li      $v0, 5
        syscall
        move    $t1, $v0        # t1 = number2

        # gaussian_sum = ((number2 - number1 + 1) * (number1 + number2)) / 2;
        sub     $t2, $t1, $t0   # t2 = number2 - number1
        addi    $t2, $t2, 1     # t2 = number2 - number1 + 1
        add     $t3, $t0, $t1   # t3 = number1 + number2
        mul     $t4, $t2, $t3   # t4 = t2 * t3
        li      $t5, 2
        div     $t4, $t4, $t5   # t4 = t4 / 2

        # printf("The sum of all numbers between %d and %d (inclusive) is: %d\n",
        #        number1, number2, gaussian_sum);
        li      $v0, 4
        la      $a0, output1
        syscall

        li      $v0, 1
        move    $a0, $t0
        syscall

        li      $v0, 4
        la      $a0, output2
        syscall

        li      $v0, 1
        move    $a0, $t1
        syscall

        li      $v0, 4
        la      $a0, output3
        syscall

        li      $v0, 1
        move    $a0, $t4
        syscall

        li      $v0, 11
        li      $a0, '\n'
        syscall

        # return 0;
        li      $v0, 0
        jr      $ra

        .data
prompt1:
        .asciiz "Enter first number: "
prompt2:
        .asciiz "Enter second number: "
output1:
        .asciiz "The sum of all numbers between "
output2:
        .asciiz " and "
output3:
        .asciiz " (inclusive) is: "
