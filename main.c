#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#include "cs_karting.h"

int main(void) {
    print_welcome_banner();

    printf("Enter the name of your racing series: ");
    char series_name[MAX_SIZE];
    scan_name(series_name);
    struct series *my_series = create_series(series_name);

    command_loop(my_series);

    printf("\nThank you for playing CS Karting!\n");
    return 0;
}
