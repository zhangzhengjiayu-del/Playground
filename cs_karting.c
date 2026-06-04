#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#include "cs_karting.h"

#ifndef MAX_DRIVERS
#define MAX_DRIVERS 8
#endif

// Function Prototypes
void add_race(struct series *series);
void add_track_piece(struct series *series);
void add_driver(struct series *series);
void print_series(struct series *series);
void insert_track_piece(struct series *series);
void insert_driver(struct series *series);
void copy_race_track(struct series *series);
struct track_piece *cpy_track(struct race *need_to_cpy);
void validate(struct series *series);
struct track_piece *create_STRAIGHT(void);
struct track_piece *create_START_LINE(void);
struct track_piece *create_FINISH_LINE(void);
void start_race(struct series *series);
void remove_driver_from_series(struct series *series);
void move_driver_between_races(struct series *series);
void play_turn(struct series *series);
void end_race(struct series *series);
void free_drivers(struct driver *head);
void free_track(struct track_piece *head);
void free_race(struct race *head);
void free_series(struct series *head);
void print_usage(void);
void print_welcome_banner(void);
void print_track(struct track_piece *track);
void print_drivers(struct race *race);
void scan_name(char name[MAX_SIZE]);
enum location scan_location(void);
enum piece_type scan_piece_type(void);
enum points place_to_points(int place);
enum location string_to_location(char *type_str);
char *location_to_string(enum location location);
enum piece_type string_to_type(char *type_str);
char *type_to_string(enum piece_type type);
char *status_to_string(enum race_status status);
int scan_token(char *buffer, int buffer_size);

// Helper Functions
struct race *find_race(struct series *series, char name[MAX_SIZE]);
int count_drivers(struct driver *head);
struct driver *append_driver(struct driver *head, struct driver *node);
struct driver *detach_driver(struct driver *head, struct driver *target,
    struct driver **removed);
int remove_named_from_list(struct driver **head, char name[MAX_SIZE]);
int remove_named_from_track(struct track_piece *track, char name[MAX_SIZE]);
int track_len(struct track_piece *track);
void fill_track_array(struct track_piece *track, struct track_piece **pieces);
int track_has_piece_drivers(struct track_piece *track);
void collect_active_order(struct track_piece *track,
    struct driver *drivers[MAX_DRIVERS], int places[MAX_DRIVERS], int *count);
void print_active_track(struct track_piece *track);
void print_active_leaderboard(struct track_piece *track);
void run_one_turn(struct race *race);
int race_finished(struct race *race);
void finish_race(struct race *race);

// Stage 1.1
struct series *create_series(char name[MAX_SIZE]) {
    struct series *series = malloc(sizeof(struct series));
    strcpy(series->name, name);
    series->races = NULL;
    return series;
}

// Stage 1.1
struct race *create_race(char name[MAX_SIZE], enum location location) {
    struct race *race = malloc(sizeof(struct race));
    strcpy(race->name, name);
    race->location = location;
    race->status = NOT_STARTED;
    race->track = NULL;
    race->drivers = NULL;
    race->next = NULL;
    return race;
}

// Stage 1.1
struct track_piece *create_track(enum piece_type type) {
    struct track_piece *track_piece = malloc(sizeof(struct track_piece));
    track_piece->type = type;
    track_piece->drivers = NULL;
    track_piece->next = NULL;
    return track_piece;
}

// Stage 1.1
struct driver *create_driver(char name[MAX_SIZE], int speed) {
    struct driver *driver = malloc(sizeof(struct driver));
    strcpy(driver->name, name);
    driver->speed = speed;
    driver->next = NULL;
    return driver;
}

// Stage 1.2
void command_loop(struct series *series) {
    char command, subcommand;

    printf("Enter command: ");
    while (scanf(" %c", &command) != EOF) {
        if (command == '?') {
            print_usage();
        } else if (command == 'a') {
            scanf(" %c", &subcommand);
            if (subcommand == 'r') {
                add_race(series);
            } else if (subcommand == 't') {
                add_track_piece(series);
            } else if (subcommand == 'd') {
                add_driver(series);
            } else {
                printf("ERROR: Invalid command.\n");
            }
        } else if (command == '*') {
            printf("===================[ %s ]===================\n", series->name);
            print_series(series);
        } else if (command == 'i') {
            scanf(" %c", &subcommand);
            if (subcommand == 't') {
                insert_track_piece(series);
            } else if (subcommand == 'd') {
                insert_driver(series);
            } else {
                printf("ERROR: Invalid command.\n");
            }
        } else if (command == 'c') {
            copy_race_track(series);
        } else if (command == 'v') {
            validate(series);
        } else if (command == 's') {
            start_race(series);
        } else if (command == 'r') {
            remove_driver_from_series(series);
        } else if (command == 'm') {
            move_driver_between_races(series);
        } else if (command == 't') {
            play_turn(series);
        } else if (command == 'e') {
            end_race(series);
        } else if (command == 'q') {
            free_series(series);
            return;
        } else {
            printf("ERROR: Invalid command.\n");
        }
        printf("Enter command: ");
    }
    free_series(series);
}

// Stage 1.3
void add_race(struct series *series) {
    char name[MAX_SIZE];
    enum location location;
    scan_name(name);
    location = scan_location();

    if (find_race(series, name) != NULL) {
        printf("ERROR: Race %s already exists.\n", name);
        return;
    }

    struct race *new = create_race(name, location);
    if (series->races == NULL) {
        series->races = new;
    } else {
        struct race *curr = series->races;
        while (curr->next != NULL) {
            curr = curr->next;
        }
        curr->next = new;
    }
    printf("Race: '%s' added!\n", new->name);
}

// Stage 1.3
void add_track_piece(struct series *series) {
    char name[MAX_SIZE];
    scan_name(name);
    enum piece_type type = scan_piece_type();

    if (type == INVALID) {
        printf("ERROR: Invalid track piece type.\n");
        return;
    }

    struct race *curr = find_race(series, name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", name);
        return;
    }
    if (curr->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", name);
        return;
    }

    struct track_piece *new = create_track(type);
    if (curr->track == NULL) {
        curr->track = new;
    } else {
        struct track_piece *temp = curr->track;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = new;
    }
    printf("Track Piece: '%s' added!\n", type_to_string(type));
}

// Stage 1.3
void add_driver(struct series *series) {
    char race_name[MAX_SIZE];
    char driver_name[MAX_SIZE];
    int speed;

    scan_name(race_name);
    scan_name(driver_name);
    scanf("%d", &speed);

    struct race *curr = find_race(series, race_name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", race_name);
        return;
    }
    if (curr->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", race_name);
        return;
    }

    struct driver *temp = curr->drivers;
    while (temp != NULL) {
        if (strcmp(temp->name, driver_name) == 0) {
            printf("ERROR: Driver with name %s already exists in race.\n",
                driver_name);
            return;
        }
        temp = temp->next;
    }
    if (speed > 3 || speed < 1) {
        printf("ERROR: Driver speed must be within 1 and 3.\n");
        return;
    }
    if (count_drivers(curr->drivers) >= MAX_DRIVERS) {
        printf("ERROR: Maximum of 8 drivers per race.\n");
        return;
    }

    struct driver *new = create_driver(driver_name, speed);
    if (curr->drivers == NULL) {
        curr->drivers = new;
    } else {
        temp = curr->drivers;
        while (temp->next != NULL) {
            temp = temp->next;
        }
        temp->next = new;
    }
    printf("Driver: '%s' added!\n", driver_name);
}

// Stage 1.4
void print_series(struct series *series) {
    if (series->races == NULL) {
        printf("The racing series is empty!\n");
        return;
    }

    struct race *curr = series->races;
    printf("Races: \n");
    while (curr != NULL) {
        printf("    %s [%s]\n", curr->name, status_to_string(curr->status));
        printf("    (%s)\n", location_to_string(curr->location));
        print_track(curr->track);
        print_drivers(curr);
        curr = curr->next;
    }
    printf("\n");
}

// Stage 2.1
void insert_track_piece(struct series *series) {
    int n;
    char name[MAX_SIZE];
    enum piece_type type;

    scanf("%d", &n);
    scan_name(name);
    type = scan_piece_type();

    if (n < 1) {
        printf("ERROR: Position must be at least 1.\n");
        return;
    }
    if (type == INVALID) {
        printf("ERROR: Invalid track piece type.\n");
        return;
    }

    struct race *curr = find_race(series, name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", name);
        return;
    }
    if (curr->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", name);
        return;
    }

    struct track_piece *new = create_track(type);
    if (curr->track == NULL || n == 1) {
        new->next = curr->track;
        curr->track = new;
    } else {
        struct track_piece *temp = curr->track;
        int pos = 1;
        while (temp->next != NULL && pos < n - 1) {
            temp = temp->next;
            pos++;
        }
        new->next = temp->next;
        temp->next = new;
    }
    printf("Track Piece: '%s' inserted!\n", type_to_string(type));
}

// Stage 2.1
void insert_driver(struct series *series) {
    int n;
    char race_name[MAX_SIZE];
    char driver_name[MAX_SIZE];
    int speed;

    scanf("%d", &n);
    scan_name(race_name);
    scan_name(driver_name);
    scanf("%d", &speed);

    if (n < 1) {
        printf("ERROR: Position must be at least 1.\n");
        return;
    }

    struct race *curr = find_race(series, race_name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", race_name);
        return;
    }
    if (curr->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", race_name);
        return;
    }
    if (speed > 3 || speed < 1) {
        printf("ERROR: Driver speed must be within 1 and 3.\n");
        return;
    }
    if (count_drivers(curr->drivers) >= MAX_DRIVERS) {
        printf("ERROR: Maximum of 8 drivers per race.\n");
        return;
    }

    struct driver *temp = curr->drivers;
    while (temp != NULL) {
        if (strcmp(temp->name, driver_name) == 0) {
            printf("ERROR: Driver with name %s already exists in race.\n",
                driver_name);
            return;
        }
        temp = temp->next;
    }

    struct driver *new = create_driver(driver_name, speed);
    if (curr->drivers == NULL || n == 1) {
        new->next = curr->drivers;
        curr->drivers = new;
    } else {
        temp = curr->drivers;
        int pos = 1;
        while (temp->next != NULL && pos < n - 1) {
            temp = temp->next;
            pos++;
        }
        new->next = temp->next;
        temp->next = new;
    }
    printf("Driver: '%s' inserted!\n", driver_name);
}

// Stage 2.2
void copy_race_track(struct series *series) {
    char need_to_cpy_name[MAX_SIZE];
    char new_name[MAX_SIZE];

    scan_name(need_to_cpy_name);
    scan_name(new_name);

    if (find_race(series, new_name) != NULL) {
        printf("ERROR: Race %s already exists.\n", new_name);
        return;
    }

    struct race *source = find_race(series, need_to_cpy_name);
    if (source == NULL) {
        printf("ERROR: No race with name %s.\n", need_to_cpy_name);
        return;
    }
    if (source->track == NULL) {
        printf("ERROR: No track pieces in race to be copied.\n");
        return;
    }

    struct race *new = create_race(new_name, source->location);
    new->track = cpy_track(source);

    if (series->races == NULL) {
        series->races = new;
    } else {
        struct race *curr = series->races;
        while (curr->next != NULL) {
            curr = curr->next;
        }
        curr->next = new;
    }
}

// Stage 2.2
struct track_piece *cpy_track(struct race *need_to_cpy) {
    struct track_piece *old = need_to_cpy->track;
    struct track_piece *new_head = NULL;
    struct track_piece *new_tail = NULL;

    while (old != NULL) {
        struct track_piece *copy = create_track(old->type);
        if (new_head == NULL) {
            new_head = copy;
            new_tail = copy;
        } else {
            new_tail->next = copy;
            new_tail = copy;
        }
        old = old->next;
    }
    return new_head;
}

// Stage 2.3
void validate(struct series *series) {
    char check_name[MAX_SIZE];
    scan_name(check_name);

    struct race *curr = find_race(series, check_name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", check_name);
        return;
    }
    if (curr->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", check_name);
        return;
    }

    struct track_piece *temp = curr->track;
    while (temp != NULL && temp->next != NULL) {
        if (temp->type == JUMP && temp->next->type != STRAIGHT) {
            struct track_piece *new = create_STRAIGHT();
            new->next = temp->next;
            temp->next = new;
            temp = new->next;
        } else if (temp->type == RIGHT_TURN &&
                temp->next->type == RIGHT_TURN) {
            struct track_piece *new = create_STRAIGHT();
            new->next = temp->next;
            temp->next = new;
            temp = new->next;
        } else {
            temp = temp->next;
        }
    }
    printf("Race %s validated!\n", check_name);
}

// Stage 2.3
struct track_piece *create_STRAIGHT(void) {
    return create_track(STRAIGHT);
}

// Stage 2.4
struct track_piece *create_START_LINE(void) {
    return create_track(START_LINE);
}

struct track_piece *create_FINISH_LINE(void) {
    return create_track(FINISH_LINE);
}

// Stage 2.4
void start_race(struct series *series) {
    char check_name[MAX_SIZE];
    scan_name(check_name);

    struct race *curr = find_race(series, check_name);
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", check_name);
        return;
    }
    if (curr->track == NULL) {
        printf("ERROR: No track pieces in race %s.\n", check_name);
        return;
    }
    if (curr->status == ACTIVE) {
        printf("ERROR: Race %s has already started.\n", check_name);
        return;
    }
    if (curr->drivers == NULL) {
        printf("ERROR: No drivers in race %s.\n", check_name);
        return;
    }

    curr->status = ACTIVE;
    struct track_piece *head = create_START_LINE();
    head->drivers = curr->drivers;
    head->next = curr->track;
    curr->track = head;

    struct track_piece *temp = curr->track;
    while (temp->next != NULL) {
        temp = temp->next;
    }
    temp->next = create_FINISH_LINE();

    curr->drivers = NULL;
    printf("Race %s started!\n", check_name);
}

// Stage 3.2
void remove_driver_from_series(struct series *series) {
    char driver_name[MAX_SIZE];
    scan_name(driver_name);

    int removed = 0;
    struct race *curr = series->races;
    while (curr != NULL) {
        if (curr->status == ACTIVE) {
            removed += remove_named_from_track(curr->track, driver_name);
        } else {
            removed += remove_named_from_list(&curr->drivers, driver_name);
        }
        curr = curr->next;
    }

    if (removed == 0) {
        printf("ERROR: Driver %s not found in the series.\n", driver_name);
        return;
    }
    printf("Driver %s removed from the racing series!\n", driver_name);
}

// Stage 3.3
void move_driver_between_races(struct series *series) {
    char driver_name[MAX_SIZE];
    char current_name[MAX_SIZE];
    char new_name[MAX_SIZE];

    scan_name(driver_name);
    scan_name(current_name);
    scan_name(new_name);

    struct race *current_race = find_race(series, current_name);
    if (current_race == NULL) {
        printf("ERROR: No race with name %s.\n", current_name);
        return;
    }
    if (current_race->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", current_name);
        return;
    }

    struct race *new_race = find_race(series, new_name);
    if (new_race == NULL) {
        printf("ERROR: No race with name %s.\n", new_name);
        return;
    }
    if (new_race->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", new_name);
        return;
    }

    struct driver *target = current_race->drivers;
    while (target != NULL && strcmp(target->name, driver_name) != 0) {
        target = target->next;
    }
    if (target == NULL) {
        printf("ERROR: Driver %s not found in race %s.\n",
            driver_name, current_name);
        return;
    }

    struct driver *temp = new_race->drivers;
    while (temp != NULL) {
        if (strcmp(temp->name, driver_name) == 0) {
            printf("ERROR: Driver %s already in race %s.\n",
                driver_name, new_name);
            return;
        }
        temp = temp->next;
    }
    if (count_drivers(new_race->drivers) >= MAX_DRIVERS) {
        printf("ERROR: Race %s already at maximum driver limit.\n", new_name);
        return;
    }

    struct driver *removed = NULL;
    current_race->drivers = detach_driver(current_race->drivers, target, &removed);
    new_race->drivers = append_driver(new_race->drivers, removed);
}

// Stage 3.4
void play_turn(struct series *series) {
    char race_name[MAX_SIZE];
    int turns;

    scan_name(race_name);
    scanf("%d", &turns);

    struct race *race = find_race(series, race_name);
    if (race == NULL) {
        printf("ERROR: No race with name %s.\n", race_name);
        return;
    }
    if (race->status != ACTIVE) {
        printf("ERROR: Race %s is not active.\n", race_name);
        return;
    }
    if (turns < 1) {
        printf("ERROR: Turns must be a positive integer.\n");
        return;
    }

    for (int i = 0; i < turns; i++) {
        run_one_turn(race);
        if (race_finished(race)) {
            finish_race(race);
            return;
        }
    }
}

// Stage 3.5
void end_race(struct series *series) {
    char race_name[MAX_SIZE];
    scan_name(race_name);

    struct race *race = find_race(series, race_name);
    if (race == NULL) {
        printf("ERROR: No race with name %s.\n", race_name);
        return;
    }
    if (race->status != ACTIVE) {
        printf("ERROR: Race %s is not active.\n", race_name);
        return;
    }

    while (!race_finished(race)) {
        run_one_turn(race);
    }
    finish_race(race);
}

void free_drivers(struct driver *head) {
    while (head != NULL) {
        struct driver *curr = head->next;
        free(head);
        head = curr;
    }
}

void free_track(struct track_piece *head) {
    while (head != NULL) {
        struct track_piece *curr = head->next;
        // === 中文标记：修改 ===
        // 释放赛道节点前，顺手释放挂在该赛道片段上的 driver 链表。
        // 这样 ACTIVE 状态下还留在 track 上的车手也不会泄漏内存。
        free_drivers(head->drivers);
        head->drivers = NULL;
        free(head);
        head = curr;
    }
}

void free_race(struct race *head) {
    while (head != NULL) {
        struct race *curr = head->next;
        free_track(head->track);
        free_drivers(head->drivers);
        free(head);
        head = curr;
    }
}

void free_series(struct series *head) {
    free_race(head->races);
    free(head);
}

void print_usage() {
    printf(
       "======================[ Usage Info ]=====================\n"
       "                                                         \n"
       "  ?                                                      \n"
       "    Show this help information.                          \n"
       "  a r [race_name] [location]                             \n"
       "    Add a new race with the given name and location.     \n"
       "  a t [race_name] [piece_type]                           \n"
       "    Add a track piece of the given type to the race.     \n"
       "  a d [race_name] [driver_name] [speed]                  \n"
       "    Add a driver to the specified race.                  \n"
       "  *                                                      \n"
       "    Print the racing series.                             \n"
       "  i t [n] [race_name] [piece_type]                       \n"
       "    Insert a track piece at position [n] in the race.    \n"
       "  i d [n] [race_name] [driver_name] [speed]              \n"
       "    Insert a driver at [position] in the specified race. \n"
       "  c [existing_race] [new_race]                           \n"
       "    Adds a new race with the same track layout.          \n"
       "  s [race_name]                                          \n"
       "    Start the specified race.                            \n"
       "  v [race_name]                                          \n"
       "    Validates the specified rules meets track compliance.\n"
       "  m [driver_name] [current_race] [new_race]              \n"
       "    Moves the driver from one race to another.           \n"
       "  q                                                      \n"
       "    Cancels the karting series.                          \n"
       "  r [driver_name]                                        \n"
       "    Removes the driver from all races.                   \n"
       "  t [race_name] [turns]                                  \n"
       "    Advance the race by [turns].                         \n"
       "  e [race_name]                                          \n"
       "    Automatically run turns until the race finishes.     \n"
       "  f [location]                                           \n"
       "    Create a finals race for the given location.         \n"
       "                                                         \n"
       "=========================================================\n"
    );
}

void print_welcome_banner() {
    printf(""
    "          Welcome to the CS Karting Racing Series!\n"
    "                  .\n"
    "                  |\\\n"
    "                  |_\\\n"
    "                  |\n"
    "       .==========||=======.    .===================.\n"
    "      /    _______||____    \\  /   _[_0|_[?]_______   \\\n"
    "     /   /'              '\\  \\/  /'               '\\   \\\n"
    "    |   |                  \\/   /                   |   |\n"
    "    |   |                  /   / \\                  |   |\n"
    "     \\  \\                 /   /\\  \\                /   /\n"
    "      \\  '---------------'   /  \\  '--------------'   /\n"
    "       \\.===[_0|====[_0|===./    \\.========|0_]=====./\n"
    "\n"
    );
}

void print_track(struct track_piece *track) {
    if (track == NULL) {
        printf("        Empty Track!\n");
        return;
    }
    if (track_has_piece_drivers(track)) {
        print_active_track(track);
        return;
    }
    while (track != NULL) {
        printf("        %s\n", type_to_string(track->type));
        if (track->next != NULL) {
            printf("        |\n");
            printf("        ⌄\n");
        }
        track = track->next;
    }
}

void print_drivers(struct race *race) {
    printf("        Drivers:\n");

    if (race->status == ACTIVE) {
        print_active_leaderboard(race->track);
        return;
    }

    struct driver *current = race->drivers;
    if (current == NULL) {
        printf("            Empty Driver List!\n");
        return;
    }

    int count = 1;
    while (current != NULL) {
        printf("            %d. %s (speed: %d)\n",
               count, current->name, current->speed);
        count++;
        current = current->next;
    }
}

void scan_name(char name[MAX_SIZE]) {
    scan_token(name, MAX_SIZE);
}

enum location scan_location(void) {
    char type[MAX_SIZE];
    scan_token(type, MAX_SIZE);
    return string_to_location(type);
}

enum piece_type scan_piece_type(void) {
    char type[MAX_SIZE];
    scan_token(type, MAX_SIZE);
    return string_to_type(type);
}

enum points place_to_points(int place) {
    if (place == 1) return FIRST;
    if (place == 2) return SECOND;
    if (place == 3) return THIRD;
    if (place == 4) return FOURTH;
    if (place == 5) return FIFTH;
    if (place == 6) return SIXTH;
    if (place == 7) return SEVENTH;
    return EIGHTH;
}

enum location string_to_location(char *type_str) {
    int len = strlen(type_str);
    if (strncasecmp(type_str, "ALBERT_PARK", len) == 0) return ALBERT_PARK;
    if (strncasecmp(type_str, "MARINA_BAY", len) == 0) return MARINA_BAY;
    if (strncasecmp(type_str, "MONZA", len) == 0) return MONZA;
    if (strncasecmp(type_str, "SUZUKA", len) == 0) return SUZUKA;
    return ZANDVOORT;
}

char *location_to_string(enum location location) {
    if (location == ALBERT_PARK) return "ALBERT_PARK";
    if (location == MARINA_BAY) return "MARINA_BAY";
    if (location == MONZA) return "MONZA";
    if (location == SUZUKA) return "SUZUKA";
    return "ZANDVOORT";
}

enum piece_type string_to_type(char *type_str) {
    int len = strlen(type_str);
    if (strncasecmp(type_str, "START_LINE", len) == 0) return START_LINE;
    if (strncasecmp(type_str, "FINISH_LINE", len) == 0) return FINISH_LINE;
    if (strncasecmp(type_str, "STRAIGHT", len) == 0) return STRAIGHT;
    if (strncasecmp(type_str, "LEFT_TURN", len) == 0) return LEFT_TURN;
    if (strncasecmp(type_str, "RIGHT_TURN", len) == 0) return RIGHT_TURN;
    if (strncasecmp(type_str, "JUMP", len) == 0) return JUMP;
    if (strncasecmp(type_str, "MYSTERY_BOX", len) == 0) return MYSTERY_BOX;
    return INVALID;
}

char *type_to_string(enum piece_type type) {
    if (type == START_LINE) return "START_LINE";
    if (type == FINISH_LINE) return "FINISH_LINE";
    if (type == STRAIGHT) return "STRAIGHT";
    if (type == LEFT_TURN) return "LEFT_TURN";
    if (type == RIGHT_TURN) return "RIGHT_TURN";
    if (type == JUMP) return "JUMP";
    if (type == MYSTERY_BOX) return "MYSTERY_BOX";
    return "INVALID";
}

char *status_to_string(enum race_status status) {
    if (status == NOT_STARTED) return "NOT_STARTED";
    if (status == ACTIVE) return "ACTIVE";
    return "COMPLETED";
}

int scan_token(char *buffer, int buffer_size) {
    if (buffer_size == 0) return 0;
    char c;
    int i = 0;
    int num_scanned = 0;

    scanf(" ");
    while (i < buffer_size - 1 && (num_scanned = scanf("%c", &c)) == 1 &&
           !isspace(c)) {
        buffer[i++] = c;
    }
    if (i > 0) {
        buffer[i] = '\0';
    }
    return num_scanned;
}

struct race *find_race(struct series *series, char name[MAX_SIZE]) {
    struct race *curr = series->races;
    while (curr != NULL) {
        if (strcmp(curr->name, name) == 0) return curr;
        curr = curr->next;
    }
    return NULL;
}

int count_drivers(struct driver *head) {
    int count = 0;
    while (head != NULL) {
        count++;
        head = head->next;
    }
    return count;
}

struct driver *append_driver(struct driver *head, struct driver *node) {
    node->next = NULL;
    if (head == NULL) return node;
    struct driver *curr = head;
    while (curr->next != NULL) curr = curr->next;
    curr->next = node;
    return head;
}

struct driver *detach_driver(struct driver *head, struct driver *target,
    struct driver **removed) {
    struct driver *curr = head;
    struct driver *prev = NULL;

    while (curr != NULL) {
        if (curr == target) {
            if (prev == NULL) head = curr->next;
            else prev->next = curr->next;
            curr->next = NULL;
            *removed = curr;
            return head;
        }
        prev = curr;
        curr = curr->next;
    }

    *removed = NULL;
    return head;
}

int remove_named_from_list(struct driver **head, char name[MAX_SIZE]) {
    int removed = 0;
    struct driver *curr = *head;
    struct driver *prev = NULL;

    while (curr != NULL) {
        if (strcmp(curr->name, name) == 0) {
            struct driver *dead = curr;
            if (prev == NULL) {
                *head = curr->next;
                curr = *head;
            } else {
                prev->next = curr->next;
                curr = prev->next;
            }
            free(dead);
            removed++;
        } else {
            prev = curr;
            curr = curr->next;
        }
    }
    return removed;
}

int remove_named_from_track(struct track_piece *track, char name[MAX_SIZE]) {
    int removed = 0;
    while (track != NULL) {
        removed += remove_named_from_list(&track->drivers, name);
        track = track->next;
    }
    return removed;
}

int track_len(struct track_piece *track) {
    int len = 0;
    while (track != NULL) {
        len++;
        track = track->next;
    }
    return len;
}

void fill_track_array(struct track_piece *track, struct track_piece **pieces) {
    int i = 0;
    while (track != NULL) {
        pieces[i++] = track;
        track = track->next;
    }
}

int track_has_piece_drivers(struct track_piece *track) {
    while (track != NULL) {
        if (track->drivers != NULL) return 1;
        track = track->next;
    }
    return 0;
}

void collect_active_order(struct track_piece *track,
    struct driver *drivers[MAX_DRIVERS], int places[MAX_DRIVERS], int *count) {
    struct track_piece *pieces[128];
    int piece_count = track_len(track);
    fill_track_array(track, pieces);

    *count = 0;
    int place = 1;
    for (int i = piece_count - 1; i >= 0; i--) {
        struct driver *curr = pieces[i]->drivers;
        while (curr != NULL && *count < MAX_DRIVERS) {
            drivers[*count] = curr;
            places[*count] = place;
            (*count)++;
            place++;
            curr = curr->next;
        }
    }
}

void print_active_track(struct track_piece *track) {
    struct driver *drivers[MAX_DRIVERS];
    int places[MAX_DRIVERS];
    int count = 0;
    collect_active_order(track, drivers, places, &count);

    while (track != NULL) {
        printf("        %s\n", type_to_string(track->type));
        struct driver *curr = track->drivers;
        while (curr != NULL) {
            for (int i = 0; i < count; i++) {
                if (drivers[i] == curr) {
                    printf("        %d. %s\n", places[i], curr->name);
                    break;
                }
            }
            curr = curr->next;
        }
        if (track->next != NULL) {
            printf("        |\n");
            printf("        ⌄\n");
        }
        track = track->next;
    }
}

void print_active_leaderboard(struct track_piece *track) {
    struct driver *drivers[MAX_DRIVERS];
    int places[MAX_DRIVERS];
    int count = 0;
    collect_active_order(track, drivers, places, &count);

    if (count == 0) {
        printf("            Empty Driver List!\n");
        return;
    }
    for (int i = 0; i < count; i++) {
        printf("            %d. %s (speed: %d)\n",
            places[i], drivers[i]->name, drivers[i]->speed);
    }
}

void run_one_turn(struct race *race) {
    struct track_piece *pieces[128];
    struct driver *order[MAX_DRIVERS];
    int source[MAX_DRIVERS];
    int piece_count = track_len(race->track);
    fill_track_array(race->track, pieces);

    int count = 0;
    for (int i = piece_count - 1; i >= 0; i--) {
        // === 中文标记：修改 ===
        // FINISH_LINE 上的 driver 已经完赛，后续回合不应继续移动。
        if (pieces[i]->type == FINISH_LINE) {
            continue;
        }
        struct driver *curr = pieces[i]->drivers;
        while (curr != NULL && count < MAX_DRIVERS) {
            order[count] = curr;
            source[count] = i;
            count++;
            curr = curr->next;
        }
    }

    for (int i = 0; i < count; i++) {
        struct driver *moved = NULL;
        pieces[source[i]]->drivers = detach_driver(
            pieces[source[i]]->drivers, order[i], &moved
        );
        if (moved != NULL) {
            int dest = source[i] + moved->speed;
            if (dest >= piece_count) dest = piece_count - 1;
            pieces[dest]->drivers = append_driver(pieces[dest]->drivers, moved);
        }
    }
}

int race_finished(struct race *race) {
    struct track_piece *pieces[128];
    int piece_count = track_len(race->track);
    fill_track_array(race->track, pieces);

    if (piece_count == 0 || pieces[piece_count - 1]->type != FINISH_LINE) {
        return 0;
    }
    for (int i = 0; i < piece_count - 1; i++) {
        if (pieces[i]->drivers != NULL) return 0;
    }
    return pieces[piece_count - 1]->drivers != NULL;
}

void finish_race(struct race *race) {
    struct track_piece *finish = race->track;
    while (finish->next != NULL) finish = finish->next;

    race->status = COMPLETED;
    race->drivers = finish->drivers;
    finish->drivers = NULL;

    printf("Race %s has finished!\n", race->name);
    printf("Final positions: \n");

    struct driver *curr = race->drivers;
    int place = 1;
    while (curr != NULL) {
        printf("    %d. %s (%d points)\n",
            place, curr->name, place_to_points(place));
        curr = curr->next;
        place++;
    }
}
