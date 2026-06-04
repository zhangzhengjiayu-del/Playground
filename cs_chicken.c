// cs_chicken.c
// Written by <zhengjiayu zhang> <z5695542> on <26/03/2026>
//
// Description: <stage1 now>

// Provided Libraries
#include <stdio.h>

// Add your own #include statements below this line
#include <ctype.h>

// Provided constants
#define COLS 10
#define ROWS 10
#define INVALID_ROW -1
#define INVALID_COL -1
#define INITIAL_POINTS 0
#define DEFAULT_POINT_TARGET 20
#define MAX_SIZE 100

// Add your own #define constants below this line


// Provided Enums
// Enum for features on the game board
enum entity {
    EMPTY,
    COIN,
    TREE,
    ROAD,
    CAR_FACING_RIGHT,
    CAR_FACING_LEFT,
    HEADLIGHTS,
    KANGAROO,
    WOMBAT_TUNNEL,
    BABY_CHICKEN,
    PLAYER,
    SHOCKED_FACE
};

// Add your own enums below this line


// Represents a tile on the board (you may edit this and add your own fields)
struct tile {
    enum entity entity;
    int old_entity;
    int moved;
};

// Add your own structs below this line
struct coordinate {
    int row;
    int col;
};

// Provided Function Prototypes
void print_welcome(void);
void initialise_board(struct tile board[ROWS][COLS]);
void print_board(
    struct tile board[ROWS][COLS],
    int curr_score,
    int target_score
);
void print_board_line(void);
void print_board_footer(int curr_score, int target_score);
void print_game_statistics(
    int turns_taken, 
    int step_count, 
    int coins,
    int score
);

// Additional Function Prototypes
void print_game_won(void);
void print_game_lost(void);

// Add your own function prototypes below this line
void check_player_position_valid(int *row, int *col);
int add_features(
    struct tile board[ROWS][COLS], 
    struct coordinate car[MAX_SIZE],
    int player_row, 
    int player_col,
    int *mode,
    int *number_of_car
);
void check_coin(
    int row, 
    int col,
    struct tile board[ROWS][COLS]
);
void check_tree(
    int row, 
    int col,
    struct tile board[ROWS][COLS]
);
void check_road(
    int row,
    struct tile board[ROWS][COLS]
);
void check_car(
    int row, 
    int col, 
    char direction, 
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int i
);
void gameplay_loop(
    int row, 
    int col, 
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE], 
    int target,
    int mode,
    int number_of_car
);
void check_headlight(struct tile board[ROWS][COLS], int row, int col);
void check_empty(struct tile board[ROWS][COLS], int row, int col);
void driving_mode (
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int number_of_car);
void car_move_forward(struct tile board[ROWS][COLS], int row, int col, int new_col, int direction);

// Provided sample main() function (you will need to modify this)
int main(void) {
    print_welcome();

    struct coordinate player;
    struct coordinate car[MAX_SIZE];
    struct tile board[ROWS][COLS];
    
    initialise_board(board);

    // stage 1.1
    printf("============== Setup Phase ==============\n");
    printf("Enter the starting position: ");
    check_player_position_valid(&player.row, &player.col);
    board[player.row][player.col].entity = PLAYER;
    
    //stage 1.2
    print_board(
        board,
        INITIAL_POINTS, 
        DEFAULT_POINT_TARGET
    );
    //stage 1.3 & 1.4
    printf("Enter setup commands:\n");
    int mode = 0;
    int number_of_car;
    int target = add_features(board, car, player.row, player.col, &mode, &number_of_car);
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            board[i][j].old_entity = board[i][j].entity;
        }
    }
    //stage 2.1
    printf("============ Gameplay Phase =============\n");
    //create a Gameplay Loop
    gameplay_loop(player.row, player.col, board, car, target, mode, number_of_car);


    return 0;
}

// Add your function definitions below this line



// =============================================================================
// Provided Helper Functions
// =============================================================================

// Prints the game's welcome banner
void print_welcome(void) {
    printf(
        "_________________________________________   \n"
        "   \\\\                               \\\\  \n"
        "   (o>   !!    Welcome to    !!     (o>     \n"
        "\\\\_//)         CS CHICKEN        \\\\_//) \n"
        " \\_/_)                            \\_/_)   \n"
        "  _|_                              _|_      \n"
        "_________________________________________   \n\n"
    );
}

// Given a 2D board array, initialises all tile entities to EMPTY.
void initialise_board(struct tile board[ROWS][COLS]) {
    for (int row = 0; row < ROWS; row++) {
        for (int col = 0; col < COLS; col++) {
            board[row][col].entity = EMPTY;
            board[row][col].moved = 0;
        }
    }
}

// Prints the game board, showing the player's position, current score and 
// target score
void print_board(
    struct tile board[ROWS][COLS],
    int curr_score,
    int target_score
) {
    print_board_line();
    printf("|          C S   C H I C K E N          |\n");
    print_board_line();
    
    for (int row = 0; row < ROWS; row++) {
        for (int col = 0; col < COLS; col++) {
            printf("|");
            if (board[row][col].entity == PLAYER) {
                printf("^_^");
            } else if (board[row][col].entity == EMPTY) {
                printf("   ");
            } else if (board[row][col].entity == COIN) {
                printf(" c ");
            } else if (board[row][col].entity == TREE) {
                printf(" T ");
            } else if (board[row][col].entity == ROAD) {
                printf("___");
            } else if (board[row][col].entity == CAR_FACING_RIGHT) {
                printf("[_0");
            } else if (board[row][col].entity == CAR_FACING_LEFT) {
                printf("0_]");
            } else if (board[row][col].entity == HEADLIGHTS) {
                printf("###");
            } else if (board[row][col].entity == SHOCKED_FACE) {
                printf("0_0");
            } else {
                printf("   ");
            }
        }
        printf("|\n");
        print_board_line();
    }

    print_board_footer(curr_score, target_score);
    printf("\n");
}

// Helper function to print statistics. 
// Use in Stage 2.3.
void print_game_statistics(
    int turns_taken, 
    int step_count, 
    int coins, 
    int score
) {
    printf( 
        "============ Game Statistics ============\n"
        "          Turns taken: %d\n"
        "           Step count: %d\n"
        "      Coins Collected: %d\n"
        "                Score: %d\n",
        turns_taken, step_count, coins, score
    );
}

// Helper function to print the banner for when the game is won. 
// Use in Stage 2.4
void print_game_won(void) {
    printf(
        "_________________________________________   \n"
        "       Penny the Chicken is happy!          \n"
        "   \\\\                               \\\\  \n"
        "   (o>   !!    Thank  you    !!     (o>     \n"
        "\\\\_//)        for playing!       \\\\_//) \n"
        " \\_/_)                            \\_/_)   \n"
        "  _|_                              _|_      \n"
        "_________________________________________   \n\n"
    );
}

// Helper function to print the banner for when the game is won. 
// Use in Stage 3.1
void print_game_lost(void) {
    printf(
        "_________________________________________   \n"
        "   \\\\                               \\\\  \n"
        "   (x>    !!      Game      !!      (x>     \n"
        "\\\\_//)             Over          \\\\_//) \n"
        " \\_/_)                            \\_/_)   \n"
        "  _|_                              _|_      \n"
        "_________________________________________   \n\n"
    );
}

///////////////////////////////////////////////////////////////////////////////
// Additional Provided Functions
///////////////////////////////////////////////////////////////////////////////

// You don't need to use any of these, or understand how they work!
// We use them to implement some of the provided helper functions.

// Helper function for print_board(). 
void print_board_footer(int curr_score, int target_score) {
    printf("Score: %-3d                     ", curr_score);
    printf("Target: %-2d", target_score);
}

// Helper function for print_board(). 
void print_board_line(void) {
    printf("+");
    for (int col = 0; col < COLS; col++) {
        printf("---+");
    }
    printf("\n");
}

void check_player_position_valid(int *row, int *col) {
    while (1) {
        scanf(" %d %d", row, col);
        if (*row >= 0 && *row <= 9 
        && *col >= 0 && *col <= 9) {
            break;
        } else {
            printf("Penny the Chicken cannot start here!\n");
            printf("Enter the starting position: ");
        }
    }
}

int add_features(
    struct tile board[ROWS][COLS], 
    struct coordinate car[MAX_SIZE],
    int player_row, 
    int player_col,
    int *mode,
    int *number_of_car
) {
    char feature, direction;
    int row, col;
    int target = DEFAULT_POINT_TARGET;
    int new_target = 0;
    int i = 0;
    while (scanf(" %c", &feature) == 1) {
        if (feature == 'c') {
            scanf("%d%d", &row, &col);
            check_coin(row, col, board);
               
        } else if (feature == 't') {
            scanf("%d%d", &row, &col);
            check_tree(row, col, board);
            
        } else if (feature == 'r') {
            scanf("%d", &row);
            check_road(row, board);
               
        } else if (feature == 'v') {
            scanf("%d%d %c", &row, &col, &direction);
            check_car(row, col, direction, board, car, i);
            i++;
            *number_of_car = i;
        } else if (feature == 'e') {
            *mode = 0;
            break;
        } else if (feature == 'd') {
            *mode = 1;
            break;
        } else if (feature == 'x') {
            scanf("%d", &new_target);
            if (new_target < 1 || new_target > 99) {
                printf("Target must be between 1 and 99 inclusive.\n");
            } else {
                target = new_target;
            }
        }
    }
    print_board(
        board,
        INITIAL_POINTS, 
        target
    );
    return target;
}
void check_coin(
    int row, 
    int col,
    struct tile board[ROWS][COLS]
) {
    if (row > 9 || row < 0 
    || col > 9 || col < 0) {
        printf("Invalid location: position is not on map!\n");
    } else if (board[row][col].entity != EMPTY) {
        printf("Invalid location: tile is occupied!\n");
    } else {
        board[row][col].entity = COIN;
    }
}

void check_tree(
    int row, 
    int col,
    struct tile board[ROWS][COLS]
) {
    if (row > 9 || row < 0 
    || col > 9 || col < 0) {
        printf("Invalid location: position is not on map!\n");
    } else if (board[row][col].entity != EMPTY) {
        printf("Invalid location: tile is occupied!\n");
    } else {
        board[row][col].entity = TREE;
    }
}

void check_road(
    int row, 
    struct tile board[ROWS][COLS]
) {
    int count_tree = 0;
    int count_other = 0;
    int col = 0;
    if (row > 9 || row < 0) {
        printf("Invalid location: position is not on map!\n");
    } else {
        for (col = 0; col < COLS; col++) {
            if (board[row][col].entity == TREE) {
                count_tree++;
            } else if (board[row][col].entity != EMPTY
                    && board[row][col].entity != TREE) {
                count_other++;
            }
        } 
        if (count_tree >= 1 && count_other == 0) {
            printf("Deforesting.\n");
            for (col = 0; col < COLS; col++) {
                board[row][col].entity = ROAD;
            }
        } else if (count_other != 0) {
            printf("Invalid location: road cannot be built.\n");
        } else if (count_tree == 0 && count_other == 0) {
            for (col = 0; col < COLS; col++) {
                board[row][col].entity = ROAD;
            }
        }
    }
}

void check_car(
    int row, 
    int col,
    char direction,
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int i
) {
    if (row > 9 || row < 0 
        || col > 9 || col < 0) {
        printf("Invalid location: position is not on map!\n");
        return;
    }
    if (board[row][col].entity != ROAD 
        && board[row][col].entity != HEADLIGHTS) {
        printf("Invalid location: car must be on a road.\n");
        return;
    }

    if (direction == 'l') {
        board[row][col].entity = CAR_FACING_LEFT;
        car[i].row = row;
        car[i].col = col;
        if (col >= 1) {
            if (board[row][col - 1].entity != CAR_FACING_LEFT
            && board[row][col - 1].entity != CAR_FACING_RIGHT) {
                board[row][col - 1].entity = HEADLIGHTS;
            }
        }                
    } else if (direction == 'r') {
        board[row][col].entity = CAR_FACING_RIGHT;
        car[i].row = row;
        car[i].col = col;
        if (col <= 8) {
            if (board[row][col + 1].entity != CAR_FACING_LEFT
            && board[row][col + 1].entity != CAR_FACING_RIGHT) {
                board[row][col + 1].entity = HEADLIGHTS;
            }
        }
    
    } 
}

void gameplay_loop(int row,
                int col, 
                struct tile board[ROWS][COLS],
                struct coordinate car[MAX_SIZE],
                int target,
                int mode,
                int number_of_car) {
    char press;
    int turns_taken = 0; 
    int coins_collected = 0;
    int score = 0; 
    int step_count = 0;
    while (1) {
        scanf(" %c", &press);
        if (press == 'p') {
            print_game_statistics(turns_taken,
                                step_count,
                                coins_collected,
                                score );
            continue;
        }
        if (press == 'q') {
            printf("============= Quitting Game =============\n");
            break;
        }
        int new_row = row;
        int new_col = col;
        if (press == 'R') {
        } else if (press == 'w') {
            new_row--;
        } else if (press == 'a') {
            new_col--;
        } else if (press == 's') {
            new_row++;
        } else if (press == 'd') {
            new_col++;
        }

        if (mode == 1) { 
            driving_mode(board, car, number_of_car);
        }
        int valid = 1;
        if (new_row > 9 || new_row < 0 
            || new_col > 9 || new_col < 0) {
            valid = 0;
        } else if (board[new_row][new_col].entity == TREE) {
            valid = 0;
        } else if (board[new_row][new_col].entity == COIN) {
            board[row][col].entity = EMPTY;
            board[new_row][new_col].entity = PLAYER;
            row = new_row;
            col = new_col;
            coins_collected++;
            score += 5;
            step_count++;
            valid = 0;
        } else if (board[new_row][new_col].entity == HEADLIGHTS) {
            valid = 2;
        } else if (board[new_row][new_col].entity == CAR_FACING_LEFT 
                || board[new_row][new_col].entity == CAR_FACING_RIGHT) {
            valid = 3;
        } else if (board[row][col].entity == SHOCKED_FACE) {
            board[new_row][new_col].entity = PLAYER;
        } 

        if (valid == 1 || valid == 2 || valid == 3) {
            if (board[row][col].old_entity == PLAYER 
                || board[row][col].old_entity == COIN) {
                board[row][col].entity = EMPTY;
            } else {
                board[row][col].entity = board[row][col].old_entity;
            }
            if (valid == 1) {
                board[new_row][new_col].entity = PLAYER;
            } else {
                board[new_row][new_col].entity = SHOCKED_FACE;
            }
            row = new_row;
            col = new_col;
            step_count++;
        } 
        turns_taken++;

        print_board(
        board,
        score, 
        target
        );
        if (valid == 3) {
            print_game_statistics(turns_taken,
                                    step_count,
                                    coins_collected,
                                    score );
            print_game_lost();
            return;
        }
        if (score >= target) {
            print_game_statistics(turns_taken,
                                    step_count,
                                    coins_collected,
                                    score );
            print_game_won();
            return;
        }   
    }     
}


void check_headlight(struct tile board[ROWS][COLS], int row, int col) {
    if (col >= 0 && col <= 9
    &&  board[row][col].entity != CAR_FACING_LEFT
    && board[row][col].entity != CAR_FACING_RIGHT) {
        board[row][col].entity = HEADLIGHTS;
    }
}
void check_empty(struct tile board[ROWS][COLS], int row, int col) {
    if (col >= 0 && col <= 9) {
        board[row][col].entity = ROAD;
    }
}





void driving_mode (
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int number_of_car) {
    /*for (int i = 0; i < number_of_car; i++) {
        if (board[car[i].row][car[i].col].entity == CAR_FACING_LEFT) {
            if (car[i].col == 0) {
                board[car[i].row][car[i].col].entity = CAR_FACING_RIGHT;
                check_headlight(board, car[i].row, car[i].col + 1); 
            } else if (board[car[i].row][car[i].col - 1].entity == CAR_FACING_RIGHT) {
                board[car[i].row][car[i].col].entity = CAR_FACING_RIGHT;
                check_headlight(board, car[i].row, car[i].col + 1); 
            } else {
                check_headlight(board, car[i].row, car[i].col - 2);
                check_empty(board, car[i].row, car[i].col);
                car[i].col--;
                board[car[i].row][car[i].col].entity = CAR_FACING_LEFT; 
            }
            board[car[i].row][car[i].col].moved = 1;
        } 
        
    }
    for (int i = number_of_car - 1; i >= 0; i--) {
        if (board[car[i].row][car[i].col].entity == CAR_FACING_RIGHT 
        && board[car[i].row][car[i].col].moved == 0) {
            if (car[i].col == 9) {
                board[car[i].row][car[i].col].entity = CAR_FACING_LEFT;
                check_headlight(board, car[i].row, car[i].col - 1); 
            } else if (board[car[i].row][car[i].col + 1].entity == CAR_FACING_LEFT) {
                board[car[i].row][car[i].col].entity = CAR_FACING_LEFT;
                check_headlight(board, car[i].row, car[i].col - 1);
            } else {
                check_headlight(board, car[i].row, car[i].col + 2);
                check_empty(board, car[i].row, car[i].col);
                car[i].col++;
                board[car[i].row][car[i].col].entity = CAR_FACING_RIGHT;
            }
        } else {
            board[car[i].row][car[i].col].moved = 0;
        }
    }*/
    
    for (int r = 0; r < ROWS; r++) {
        for (int c = 0; c < COLS; c++) {
            board[r][c].moved = 0;
        }
    }

    // =====================
    // 👉 先处理 RIGHT（从右往左）
    // =====================
    for (int col = COLS - 1; col >= 0; col--) {
        for (int row = 0; row < ROWS; row++) {

            if (board[row][col].entity == CAR_FACING_RIGHT &&
                board[row][col].moved == 0) {

                int new_col = col + 1;

                // ❌ 原来：只判断是不是另一辆车
                // ✅ 改成：统一判断是否合法
                if (new_col >= COLS ||
                    (board[row][new_col].entity != ROAD &&
                    board[row][new_col].entity != HEADLIGHTS)) {

                    // 👉 掉头
                    board[row][col].entity = CAR_FACING_LEFT;
                    check_headlight(board, row, col - 1);

                } else {
                    // 👉 移动
                    check_empty(board, row, col);
                    car_move_forward(board, row, col, new_col, CAR_FACING_RIGHT);
                }

                board[row][col].moved = 1;
            }
        }
    }

    // =====================
    // 👉 再处理 LEFT（从左往右）
    // =====================
    for (int col = 0; col < COLS; col++) {
        for (int row = 0; row < ROWS; row++) {

            if (board[row][col].entity == CAR_FACING_LEFT &&
                board[row][col].moved == 0) {

                int new_col = col - 1;

                if (new_col < 0 ||
                    (board[row][new_col].entity != ROAD &&
                    board[row][new_col].entity != HEADLIGHTS)) {

                    // 👉 掉头
                    board[row][col].entity = CAR_FACING_RIGHT;
                    check_headlight(board, row, col + 1);

                } else {
                    // 👉 移动
                    check_empty(board, row, col);
                    car_move_forward(board, row, col, new_col, CAR_FACING_LEFT);
                }

                board[row][col].moved = 1;
            }
        }
    }
}
void car_move_forward(struct tile board[ROWS][COLS], int row, int col, int new_col, int direction) {
    board[row][col].entity = ROAD;

    board[row][new_col].entity = direction;

    if (direction == CAR_FACING_RIGHT) {
        check_headlight(board, row, new_col + 1);
    } else {
        check_headlight(board, row, new_col - 1);
    }
}


    


    