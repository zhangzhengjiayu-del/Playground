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
#define NO_TUNNEL -1
#define MAX_TUNNELS 10

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
    int tunnel_id;
};

// Add your own structs below this line
struct coordinate {
    int row;
    int col;
};
struct tunnel {
    struct coordinate first;
    struct coordinate second;
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
    int *number_of_car,
    struct tunnel wombat[MAX_TUNNELS],
    int *number_of_tunnel
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
int check_car(
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
    struct tunnel wombat[MAX_TUNNELS],
    int number_of_tunnel
);
void check_headlight(struct tile board[ROWS][COLS], int row, int col);
int driving_mode (
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int player_row,
    int player_col,
    enum entity *player_under
);
int check_car(
    int row,
    int col,
    char direction,
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int i
);
void check_tunnel(
    int row_1,
    int col_1,
    int row_2,
    int col_2,
    int player_row,
    int player_col,
    struct tile board[ROWS][COLS],
    struct tunnel wombat[MAX_TUNNELS],
    int *number_of_tunnel
);
int valid_position(int row, int col);
int is_car(enum entity entity);
int is_turn(char press);
void restore_top_row_coin(struct tile board[ROWS][COLS]);
void scroll_board(struct tile board[ROWS][COLS]);
void put_player(
    struct tile board[ROWS][COLS],
    int row,
    int col,
    enum entity player_under
);
int move_to_tunnel_exit(
    int *new_row,
    int *new_col,
    int row_add,
    int col_add,
    struct tile board[ROWS][COLS],
    struct tunnel wombat[MAX_TUNNELS]
);
int scrolling_mode(
    struct tile board[ROWS][COLS],
    int *row,
    int col,
    enum entity *player_under,
    char press,
    int old_row,
    int moved,
    int used_tunnel,
    int *coins_collected,
    int *score,
    int *step_count
);

// Provided sample main() function (you will need to modify this)
int main(void) {
    print_welcome();

    struct coordinate player;
    struct coordinate car[MAX_SIZE];
    struct tunnel wombat[MAX_TUNNELS];
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
    int number_of_car = 0;
    int number_of_tunnel = 0;
    int target = add_features(
        board,
        car,
        player.row,
        player.col,
        &mode,
        &number_of_car,
        wombat,
        &number_of_tunnel
    );
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            board[i][j].old_entity = board[i][j].entity;
        }
    }
    
    //stage 2.1
    printf("============ Gameplay Phase =============\n");
    //create a Gameplay Loop
    gameplay_loop(
        player.row,
        player.col,
        board,
        car,
        target,
        mode,
        wombat,
        number_of_tunnel
    );


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
            board[row][col].old_entity = EMPTY;
            board[row][col].moved = 0;
            board[row][col].tunnel_id = NO_TUNNEL;
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
            } else if (board[row][col].entity == WOMBAT_TUNNEL) {
                printf("(%d)", board[row][col].tunnel_id);
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
    int *number_of_car,
    struct tunnel wombat[MAX_TUNNELS],
    int *number_of_tunnel
) {
    char feature, direction, next;
    int row, col, row_2, col_2;
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
            if (check_car(row, col, direction, board, car, i) == 1) {
                i++;
                *number_of_car = i;
            }
        } else if (feature == 'e') {
            *mode = 0;
            break;
        } else if (feature == 'd') {
            *mode = 1;
            break;
        } else if (feature == 's') {
            *mode = 2;
            break;
        } else if (feature == 'w') {
            scanf(" %c", &next);
            if (next == 't') {
                scanf("%d%d%d%d", &row, &col, &row_2, &col_2);
                check_tunnel(
                    row,
                    col,
                    row_2,
                    col_2,
                    player_row,
                    player_col,
                    board,
                    wombat,
                    number_of_tunnel
                );
            }
        } else if (feature == 'x') {
            scanf("%d", &new_target);
            if (new_target < 1 || new_target > 99) {
                printf("Target must be between 1 and 99 inclusive.\n");
            } else {
                target = new_target;           //here is target
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

int check_car(
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
        return 0;
    }
    if (board[row][col].entity != ROAD
        && board[row][col].entity != HEADLIGHTS) {
        printf("Invalid location: car must be on a road.\n");
        return 0;
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
    return 1;
}

void check_tunnel(
    int row_1,
    int col_1,
    int row_2,
    int col_2,
    int player_row,
    int player_col,
    struct tile board[ROWS][COLS],
    struct tunnel wombat[MAX_TUNNELS],
    int *number_of_tunnel
) {
    if (*number_of_tunnel >= MAX_TUNNELS) {
        printf("Invalid feature: too many tunnels!\n");
    } else if (valid_position(row_1, col_1) == 0
        || valid_position(row_2, col_2) == 0) {
        printf("Invalid location: wombat couldn't dig a tunnel here!\n");
    } else if ((row_1 == player_row && col_1 == player_col)
        || (row_2 == player_row && col_2 == player_col)
        || board[row_1][col_1].entity != EMPTY
        || board[row_2][col_2].entity != EMPTY) {
        printf("Invalid location: wombat couldn't dig a tunnel here!\n");
    } else {
        int id = *number_of_tunnel;
        board[row_1][col_1].entity = WOMBAT_TUNNEL;
        board[row_2][col_2].entity = WOMBAT_TUNNEL;
        board[row_1][col_1].tunnel_id = id;
        board[row_2][col_2].tunnel_id = id;
        wombat[id].first.row = row_1;
        wombat[id].first.col = col_1;
        wombat[id].second.row = row_2;
        wombat[id].second.col = col_2;
        *number_of_tunnel = *number_of_tunnel + 1;
    }
}

void gameplay_loop(int row,
                int col,
                struct tile board[ROWS][COLS],
                struct coordinate car[MAX_SIZE],
                int target,
                int mode,
                struct tunnel wombat[MAX_TUNNELS],
                int number_of_tunnel) {
    char press;
    int turns_taken = 0;
    int coins_collected = 0;
    int score = 0;
    int step_count = 0;
    enum entity player_under = EMPTY;
    while (scanf(" %c", &press) == 1) {
        if (press == 'p') {
            print_game_statistics(turns_taken, step_count, coins_collected, score);
            continue;
        }
        if (press == 'q') {
            printf("============= Quitting Game =============\n");
            break;
        }
        if (is_turn(press) == 0) {
            continue;
        }

        int new_row = row;
        int new_col = col;
        int player_lost = 0;
        int moved = 0;
        int used_tunnel = 0;
        int old_row = row;
        int row_add = 0;
        int col_add = 0;

        if (press == 'w') {
            new_row--;
            row_add = -1;
        } else if (press == 'a') {
            new_col--;
            col_add = -1;
        } else if (press == 's') {
            new_row++;
            row_add = 1;
        } else if (press == 'd') {
            new_col++;
            col_add = 1;
        }

        if (press != 'R') {
            if (valid_position(new_row, new_col) == 1
                && board[new_row][new_col].entity == WOMBAT_TUNNEL
                && number_of_tunnel > 0) {
                used_tunnel = move_to_tunnel_exit(
                    &new_row,
                    &new_col,
                    row_add,
                    col_add,
                    board,
                    wombat
                );
            }

            if (valid_position(new_row, new_col) == 1
                && board[new_row][new_col].entity != TREE) {
                board[row][col].entity = player_under;
                player_under = board[new_row][new_col].entity;
                if (player_under == COIN) {
                    coins_collected++;
                    score += 5;
                    player_under = EMPTY;
                }
                row = new_row;
                col = new_col;
                if (is_car(player_under) == 1) {
                    player_lost = 1;
                    player_under = ROAD;
                    board[row][col].entity = SHOCKED_FACE;
                } else {
                    put_player(board, row, col, player_under);
                }
                moved = 1;
                step_count++;
            }
        }

        turns_taken++;

        if (player_lost == 0 && score >= target) {
            print_board(board, score, target);
            print_game_statistics(turns_taken, step_count, coins_collected, score);
            print_game_won();
            return;
        }

        if ((mode == 1 || mode == 2) && player_lost == 0) {
            int car_result = driving_mode(board, car, row, col, &player_under);
            if (car_result == 3) {
                player_lost = 1;
            }
        }

        if (mode == 2 && player_lost == 0) {
            int scroll_result = scrolling_mode(
                board,
                &row,
                col,
                &player_under,
                press,
                old_row,
                moved,
                used_tunnel,
                &coins_collected,
                &score,
                &step_count
            );
            if (scroll_result == 3) {
                player_lost = 1;
            }
        }

        print_board(board, score, target);

        if (player_lost == 1) {
            print_game_statistics(turns_taken, step_count, coins_collected, score);
            print_game_lost();
            return;
        }
        if (score >= target) {
            print_game_statistics(turns_taken, step_count, coins_collected, score);
            print_game_won();
            return;
        }
    }
}


void check_headlight(struct tile board[ROWS][COLS], int row, int col) {
    if (valid_position(row, col) == 1
    &&  board[row][col].entity != CAR_FACING_LEFT
    && board[row][col].entity != CAR_FACING_RIGHT
    && board[row][col].entity != PLAYER
    && board[row][col].entity != SHOCKED_FACE) {
        board[row][col].entity = HEADLIGHTS;
    }
}

int driving_mode (
    struct tile board[ROWS][COLS],
    struct coordinate car[MAX_SIZE],
    int player_row,
    int player_col,
    enum entity *player_under) {
    (void) car;
    if (*player_under == HEADLIGHTS) {
        *player_under = ROAD;
        board[player_row][player_col].entity = PLAYER;
    }
    for (int i = 0; i < ROWS; i++) {
        for (int j = 0; j < COLS; j++) {
            board[i][j].moved = 0;
            if (board[i][j].entity == HEADLIGHTS) {
                board[i][j].entity = ROAD;
            }
        }
    }
    //from left to right ------>
    for (int row = 0; row < ROWS; row++) {
        for (int col = COLS - 1; col >= 0; col--) {
            if (board[row][col].entity == CAR_FACING_RIGHT
                && board[row][col].moved == 0) {
                int new_col = col + 1;
                //out of bound
                if (new_col >= COLS) {
                    board[row][col].entity = CAR_FACING_LEFT;
                    board[row][col].moved = 1;
                // collusion
                } else if (board[row][new_col].entity == PLAYER
                    || board[row][new_col].entity == SHOCKED_FACE) {
                    board[row][col].entity = ROAD;
                    board[row][new_col].entity = SHOCKED_FACE;
                    check_headlight(board, row, new_col + 1);
                    return 3;
                //move on
                } else if (board[row][new_col].entity == ROAD
                    || board[row][new_col].entity == HEADLIGHTS) {
                    board[row][new_col].entity = CAR_FACING_RIGHT;
                    board[row][col].entity = ROAD;
                    board[row][new_col].moved = 1;
                //reverse
                } else {
                    board[row][col].entity = CAR_FACING_LEFT;
                    board[row][col].moved = 1;
                }
            }
        }
    }

    //from right to left <------
    for (int row = 0; row < ROWS; row++) {
        for (int col = 0; col < COLS; col++) {
            if (board[row][col].entity == CAR_FACING_LEFT
                && board[row][col].moved == 0) {
                int new_col = col - 1;
                //out of bound
                if (new_col < 0) {
                    board[row][col].entity = CAR_FACING_RIGHT;
                    board[row][col].moved = 1;
                // collusion
                } else if (board[row][new_col].entity == PLAYER
                    || board[row][new_col].entity == SHOCKED_FACE) {
                    board[row][col].entity = ROAD;
                    board[row][new_col].entity = SHOCKED_FACE;
                    check_headlight(board, row, new_col - 1);
                    return 3;
                // move on
                } else if (board[row][new_col].entity == ROAD
                    || board[row][new_col].entity == HEADLIGHTS) {
                    board[row][new_col].entity = CAR_FACING_LEFT;
                    board[row][col].entity = ROAD;
                    board[row][new_col].moved = 1;
                // reverse
                } else {
                    board[row][col].entity = CAR_FACING_RIGHT;
                    board[row][col].moved = 1;
                }
            }
        }
    }

    for (int row = 0; row < ROWS; row++) {
        for (int col = 0; col < COLS; col++) {
            if (board[row][col].entity == CAR_FACING_RIGHT) {
                if (row == player_row && col + 1 == player_col) {
                    *player_under = HEADLIGHTS;
                    board[player_row][player_col].entity = SHOCKED_FACE;
                } else {
                    check_headlight(board, row, col + 1);
                }
            } else if (board[row][col].entity == CAR_FACING_LEFT) {
                if (row == player_row && col - 1 == player_col) {
                    *player_under = HEADLIGHTS;
                    board[player_row][player_col].entity = SHOCKED_FACE;
                } else {
                    check_headlight(board, row, col - 1);
                }
            }
        }
    }
    return 1;
}

int valid_position(int row, int col) {
    if (row < 0 || row >= ROWS || col < 0 || col >= COLS) {
        return 0;
    }
    return 1;
}

int is_car(enum entity entity) {
    if (entity == CAR_FACING_LEFT || entity == CAR_FACING_RIGHT) {
        return 1;
    }
    return 0;
}

int is_turn(char press) {
    if (press == 'w' || press == 'a' || press == 's'
        || press == 'd' || press == 'R') {
        return 1;
    }
    return 0;
}

void restore_top_row_coin(struct tile board[ROWS][COLS]) {
    for (int col = 0; col < COLS; col++) {
        if (board[0][col].entity == EMPTY
            && board[0][col].old_entity == COIN) {
            board[0][col].entity = COIN;
        }
    }
}

void scroll_board(struct tile board[ROWS][COLS]) {
    struct tile temp[COLS];
    for (int col = 0; col < COLS; col++) {
        temp[col] = board[ROWS - 1][col];
    }
    for (int row = ROWS - 1; row > 0; row--) {
        for (int col = 0; col < COLS; col++) {
            board[row][col] = board[row - 1][col];
        }
    }
    for (int col = 0; col < COLS; col++) {
        board[0][col] = temp[col];
    }
    restore_top_row_coin(board);
}

void put_player(
    struct tile board[ROWS][COLS],
    int row,
    int col,
    enum entity player_under
) {
    if (player_under == HEADLIGHTS) {
        board[row][col].entity = SHOCKED_FACE;
    } else {
        board[row][col].entity = PLAYER;
    }
}

int move_to_tunnel_exit(
    int *new_row,
    int *new_col,
    int row_add,
    int col_add,
    struct tile board[ROWS][COLS],
    struct tunnel wombat[MAX_TUNNELS]
) {
    int tunnel_id = board[*new_row][*new_col].tunnel_id;
    if (wombat[tunnel_id].first.row == *new_row
        && wombat[tunnel_id].first.col == *new_col) {
        *new_row = wombat[tunnel_id].second.row + row_add;
        *new_col = wombat[tunnel_id].second.col + col_add;
    } else {
        *new_row = wombat[tunnel_id].first.row + row_add;
        *new_col = wombat[tunnel_id].first.col + col_add;
    }
    if (valid_position(*new_row, *new_col) == 0
        || board[*new_row][*new_col].entity == TREE) {
        return 0;
    }
    return 1;
}

int scrolling_mode(
    struct tile board[ROWS][COLS],
    int *row,
    int col,
    enum entity *player_under,
    char press,
    int old_row,
    int moved,
    int used_tunnel,
    int *coins_collected,
    int *score,
    int *step_count
) {
    if (used_tunnel == 1 && *row <= 6 && moved == 1) {
        scroll_board(board);
        *row = *row + 1;
    } else if (press == 'w' && old_row >= 1 && old_row <= 6 && moved == 1) {
        scroll_board(board);
        *row = *row + 1;
    } else if (press == 'w' && old_row == 0 && moved == 0) {
        enum entity destination = board[ROWS - 1][col].entity;
        if (destination == EMPTY && board[ROWS - 1][col].old_entity == COIN) {
            destination = COIN;
        }
        if (destination != TREE) {
            scroll_board(board);
            board[1][col].entity = *player_under;
            *row = 0;
            *player_under = board[0][col].entity;
            if (*player_under == COIN) {
                *coins_collected = *coins_collected + 1;
                *score = *score + 5;
                *player_under = EMPTY;
            }
            if (is_car(*player_under) == 1) {
                board[0][col].entity = SHOCKED_FACE;
                *player_under = ROAD;
                *step_count = *step_count + 1;
                return 3;
            } else {
                put_player(board, 0, col, *player_under);
                *step_count = *step_count + 1;
            }
        }
    }
    return 1;
}
