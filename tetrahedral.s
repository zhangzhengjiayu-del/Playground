# Read a number n and print the first n tetrahedral numbers
# https://en.wikipedia.org/wiki/Tetrahedral_number
#
# Before starting work on this task, make sure you set your tab-width to 8!
# It is also suggested to indent with tabs only.
#
# YOUR-NAME-HERE, DD/MM/YYYY

#![tabsize(8)]

main:				# int main(void) {

	la	$a0, prompt	# printf("Enter how many: ");
	li	$v0, 4
	syscall

	li	$v0, 5		# scanf("%d", how_many);
	syscall
	move	$t0, $v0

	li	$t1, 1		# n = 1;

n_loop:
	bgt	$t1, $t0, end	# while (n <= how_many) {

	li	$t2, 0		# total = 0;
	li	$t3, 1		# j = 1;

j_loop:
	bgt	$t3, $t1, print_total

	li	$t4, 1		# i = 1;

i_loop:
	bgt	$t4, $t3, j_next

	add	$t2, $t2, $t4	# total = total + i;
	addi	$t4, $t4, 1	# i = i + 1;
	b	i_loop

j_next:
	addi	$t3, $t3, 1	# j = j + 1;
	b	j_loop

print_total:
	move	$a0, $t2	# printf("%d", total);
	li	$v0, 1
	syscall

	li	$a0, '\n'	# printf("%c", '\n');
	li	$v0, 11
	syscall

	addi	$t1, $t1, 1	# n = n + 1;
	b	n_loop

end:
	li	$v0, 0
	jr	$ra		# return 0

	.data
prompt:
	.asciiz "Enter how many: "
