// DESCRIPTION OF YOUR PROGRAM HERE

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#include "cs_karting.h"

// helper functions for stage 3
struct race *find_race(struct series *series, char name[MAX_SIZE]);
int count_drivers(struct driver *head);
struct driver *append_driver(struct driver *head, struct driver *node);
struct driver *detach_driver(struct driver *head, struct driver *target,
    struct driver **removed);
int remove_named_from_list(struct driver **head, char name[MAX_SIZE]);
int remove_named_from_track(struct track_piece *track, char name[MAX_SIZE]);
int track_len(struct track_piece *track);
void fill_track_array(struct track_piece *track, struct track_piece **pieces);
void collect_active_order(struct track_piece *track,
    struct driver *drivers[MAX_SIZE], int places[MAX_SIZE], int *count);
int track_has_piece_drivers(struct track_piece *track);
void print_active_track(struct track_piece *track);
void print_active_leaderboard(struct track_piece *track);
void run_one_turn(struct race *race);
int race_finished(struct race *race);
void finish_race(struct race *race);
void remove_driver_from_series(struct series *series);
void move_driver_between_races(struct series *series);
void play_turn(struct series *series);
void end_race(struct series *series);

// Stage 1.1
// Function to create the Racing Series
// Params:
//      name - the name of the series
// Returns: a pointer to the series
struct series *create_series(char name[MAX_SIZE]) {

    // TODO: Implement this function
    struct series *series = malloc(sizeof(struct series));
    strcpy(series->name, name);
    series->races = NULL;
    return series;
}

// Stage 1.1
// Function to create a race
// Params:
//      name - the name of the race
//      location - the location of the race
// Returns: a pointer to the race
struct race *create_race(char name[MAX_SIZE], enum location location) {

    // TODO: Implement this function
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
// Function to create a track piece
// Params:
//      type - the type of track piece
// Returns: a pointer to the track piece
struct track_piece *create_track(enum piece_type type) {

    // TODO: Implement this function
    struct track_piece *track_piece = malloc(sizeof(struct track_piece));
    track_piece->type = type;
    track_piece->drivers = NULL;
    track_piece->next = NULL;


    return track_piece;
}

// Stage 1.1
// Function to create a driver
// Params:
//      name - the name of the driver
//      speed - the speed of the driver
// Returns: a pointer to the driver
struct driver *create_driver(char name[MAX_SIZE], int speed) {

    // TODO: Implement this function
    struct driver *driver = malloc(sizeof(struct driver));
    strcpy(driver->name, name);
    driver->speed = speed;
    driver->next = NULL;
    return driver;
}

// Stage 1.2
// Function to run the main command loop for the program
// Params:
//      series - a pointer to the racing series
// Returns: None
void command_loop(struct series *series) {
    
    // TODO: Implement this function
    char command;
    char add;
    printf("Enter command: ");
    while (scanf(" %c", &command) != EOF) {
        if (command == '?') {
            print_usage();
        } else if (command == 'a') {
            scanf(" %c", &add);
            if (add == 'r') {
                add_race(series);
            } else if (add == 't') {
                add_track_piece(series);
            } else if (add == 'd') {
                add_driver(series);
            } 
        } else if (command == '*') {
            printf("===================[ %s ]===================\n", series->name);
            print_series(series);
        } else if (command == 'i') {
            char insert;
            scanf(" %c", &insert);
            if (insert == 't') {
                insert_track_piece(series);
            } else if (insert == 'd') {
                insert_driver(series);
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

    return;
}

// Stage 1.3
// Function to add a race
// Params:
//      series - a pointer to the racing series
// Returns: None
void add_race(struct series *series) {

    // TODO: Implement this function
    char name[MAX_SIZE];
    enum location location;
    scan_name(name);
    location = scan_location();
    struct race *new = create_race(name, location);


    if (series->races == NULL) {
        series->races = new;
    } else {
        struct race *curr = series->races;
        struct race *prev = curr;
        while (curr != NULL) {
            if (strcmp(curr->name, name) == 0) {
                printf("ERROR: Race %s already exists.\n", name);
                return;
            }
            prev = curr;
            curr = curr->next;
        }
        prev->next = new;
    }
    printf("Race: '%s' added!\n", new->name);
    return;
}

// Stage 1.3
// Function to add a track piece
// Params:
//      series - a pointer to the racing series
// Returns: None
void add_track_piece(struct series *series) {

    // TODO: Implement this function
    char name[MAX_SIZE];
    scan_name(name);
    enum piece_type type;
    type = scan_piece_type();
    if (type == INVALID) {
        printf("ERROR: Invalid track piece type.\n");
        return;
    }
    struct track_piece *new = create_track(type);

    if (series->races == NULL) {
        return;
    }
    struct race *curr = series->races;
    while (curr != NULL && strcmp(curr->name, name) != 0) {
        curr = curr->next;
    }
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", name);
        return;
    }
    if (curr->status != 0) {
        printf("ERROR: Race %s has already started.\n", name);
        return;
    }
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
    
    return;
}

// Stage 1.3
// Function to add a driver
// Params:
//      series - a pointer to the racing series
// Returns: None
void add_driver(struct series *series) {
    
    char race_name[MAX_SIZE];
    char driver_name[MAX_SIZE];
    int speed;
    scan_name(race_name);
    scan_name(driver_name);
    scanf("%d", &speed);
    struct driver *new = create_driver(driver_name, speed);
    
    if (series->races == NULL) {
        return;
    } else {
        struct race *curr = series->races;
        while (curr != NULL && strcmp(curr->name, race_name) != 0) {
            curr = curr->next;
        }
        if (curr == NULL) {
            printf("ERROR: No race with name %s.\n", race_name);
            return;
        }
        if (curr->status != 0) {
            printf("ERROR: Race %s has already started.\n", race_name);
            return;
        }
        if (curr->drivers == NULL) {
            curr->drivers = new;
        } else {
            struct driver *temp = curr->drivers;
            struct driver *prev = temp;
            int count = 0;
            while (temp != NULL) {
                if (strcmp(temp->name, driver_name) == 0) {
                    printf("ERROR: Driver with name %s already exists in race.\n", driver_name);
                    return;
                }
                if (speed > 3 || speed < 1) {
                    printf("ERROR: Driver speed must be within 1 and 3.\n");
                    return;
                }
                prev = temp;
                temp = temp->next;
                count++;
            }
            if (count >= 8) {
                printf("ERROR: Maximum of 8 drivers per race.\n");
                return;
            }
            prev->next = new;
        }
        printf("Driver: '%s' added!\n", driver_name);
    }
    return;
}

// Stage 1.4
// Function to print out the racing series
// Params:
//      series - a pointer to the racing series
// Retruns: None
void print_series(struct series *series) {
    
    // TODO: Implement this function
    if (series->races == NULL) {
        printf("The racing series is empty!\n");
        return;
    } 
    struct race *curr = series->races;
    printf("Races: \n");
    while (curr != NULL) {
        printf("    %s [%s]\n", curr->name, status_to_string(curr->status));
        printf("    (%s)\n", location_to_string(curr->location));

        struct track_piece *track = curr->track;
        print_track(track);

        print_drivers(curr);
        curr = curr->next;
    }
    printf("\n");
    return;
}


//stage 2.1
//insert nth race

void insert_track_piece(struct series *series) {

    int n = 0;
    scanf("%d", &n);
    char name[MAX_SIZE];
    scan_name(name);
    enum piece_type type;
    type = scan_piece_type();
    if (n < 1) {
        printf("ERROR: Position must be at least 1.\n");
        return;
    }

    if (type == INVALID) {
        printf("ERROR: Invalid track piece type.\n");
        return;
    }
    struct track_piece *new = create_track(type);

    if (series->races == NULL) {
        return;
    } else {
        struct race *curr = series->races;
        while (curr != NULL && strcmp(curr->name, name) != 0) {
            curr = curr->next;
        }
        if (curr == NULL) {
            printf("ERROR: No race with name %s.\n", name);
            return;
        }
        if (curr->status != 0) {
            printf("ERROR: Race %s has already started.\n", name);
            return;
        }
        if (curr->track == NULL) {
            curr->track = new;
        } else {
            struct track_piece *temp = curr->track;
            struct track_piece *prev = temp;
            while (temp != NULL) {
                if (n == 1 && prev != temp) {
                    new->next = prev->next;
                    prev->next = new;
                    printf("Track Piece: '%s' inserted!\n", type_to_string(type));
                    return;
                } else if (n == 1 && prev == temp) {
                    new->next = curr->track;
                    curr->track = new;
                    printf("Track Piece: '%s' inserted!\n", type_to_string(type));
                    return;
                }
                prev = temp;
                temp = temp->next;
                n--;
            }
            prev->next = new;
        }
        printf("Track Piece: '%s' inserted!\n", type_to_string(type));
    }
    return;
}


//stage 2.1
//insert nth driver

void insert_driver(struct series *series) {
    int n = 0;
    scanf("%d", &n);
    char race_name[MAX_SIZE];
    char driver_name[MAX_SIZE];
    int speed;
    scan_name(race_name);
    scan_name(driver_name);
    scanf("%d", &speed);

    if (n < 1) {
        printf("ERROR: Position must be at least 1.\n");
        return;
    }
    struct driver *new = create_driver(driver_name, speed);
    if (series->races == NULL) {
        return;
    } else {
        struct race *curr = series->races;
        while (curr != NULL && strcmp(curr->name, race_name) != 0) {
            curr = curr->next;
        }
        if (curr == NULL) {
            printf("ERROR: No race with name %s.\n", race_name);
            return;
        }
        if (curr->status != 0) {
            printf("ERROR: Race %s has already started.\n", race_name);
            return;
        }
        if (curr->drivers == NULL) {
            curr->drivers = new;
        } else {
            struct driver *temp = curr->drivers;
            struct driver *prev = temp;
            int count = 0;
            while (temp != NULL) {
                if (strcmp(temp->name, driver_name) == 0) {
                    printf("ERROR: Driver with name %s already exists in race.\n", driver_name);
                    return;
                }
                if (speed > 3 || speed < 1) {
                    printf("ERROR: Driver speed must be within 1 and 3.\n");
                    return;
                }
                if (n == 1 && prev != temp) {
                    new->next = prev->next;
                    prev->next = new;
                    printf("Driver: '%s' inserted!\n", driver_name);
                    return;
                } else if (n == 1 && prev == temp) {
                    new->next = curr->drivers;
                    curr->drivers = new;
                    printf("Driver: '%s' inserted!\n", driver_name);
                    return;
                }
                prev = temp;
                temp = temp->next;
                count++;
                n--;
            }
            if (count >= 8) {
                printf("ERROR: Maximum of 8 drivers per race.\n");
                return;
            }
            prev->next = new;
        }
        printf("Driver: '%s' inserted!\n", driver_name);
    }
    return;
}

//stage 2.2
//copy of an existing race's track layout.

void copy_race_track(struct series *series) {
    char need_to_cpy_name[MAX_SIZE];
    char new_name[MAX_SIZE];
    scan_name(need_to_cpy_name);
    scan_name(new_name);
    struct race *new = create_race(new_name, 0);

    if (series->races == NULL) {
        series->races = new;
    } else {
        int n = 0;
        struct race *curr = series->races;
        struct race *prev = curr;
        while (curr != NULL) {
            if (strcmp(curr->name, new_name) == 0) {
                printf("ERROR: Race %s already exists.\n", new_name);
                return;
            }
            if (strcmp(curr->name, need_to_cpy_name) == 0) {
                new->location = curr->location;
                new->track = cpy_track(curr);
                n = 1;
            }
            prev = curr;
            curr = curr->next;
        }
        if (n == 0) {
            printf("ERROR: No race with name %s.\n", need_to_cpy_name);
            return;
        }
        if (new->track == NULL) {
            printf("ERROR: No track pieces in race to be copied.\n");
            return;
        }
        prev->next = new;
    }
    return;

}


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

// 2.3

void validate(struct series *series) {
    char check_name[MAX_SIZE];
    scan_name(check_name);

    if (series->races == NULL) {
        return;
    }
    struct race *curr = series->races;
    while (curr != NULL && strcmp(curr->name, check_name) != 0) {
        curr = curr->next;
    }
    if (curr == NULL) {
        printf("ERROR: No race with name %s.\n", check_name);
        return;
    }
    if (curr->track == NULL) {
        return;
    }
    struct track_piece *temp = curr->track;

    if (curr->track->type == START_LINE) {
        printf("ERROR: Race %s has already started.\n", check_name);
        return;
    }

    while (temp != NULL) {
        if (temp->next != NULL) {
            if ((temp->type == JUMP && temp->next->type != STRAIGHT)
            || (temp->type == RIGHT_TURN && temp->next->type == RIGHT_TURN)
            || (temp->type == JUMP && temp->next->type == STRAIGHT)) {
                struct track_piece *new = create_STRAIGHT();
                new->next = temp->next;
                temp->next = new;
            }
        }
        temp = temp->next;
    }
    printf("Race %s validated!\n", check_name);

    return;

}

struct track_piece *create_STRAIGHT(void) {
    struct track_piece *validate = malloc(sizeof(struct track_piece));
    validate->type = STRAIGHT;
    validate->drivers = NULL;
    validate->next = NULL;
    return validate;
}

// 2.4 

struct track_piece *create_START_LINE(void) {
    struct track_piece *validate = malloc(sizeof(struct track_piece));
    validate->type = START_LINE;
    validate->drivers = NULL;
    validate->next = NULL;
    return validate;
}

struct track_piece *create_FINISH_LINE(void) {
    struct track_piece *validate = malloc(sizeof(struct track_piece));
    validate->type = FINISH_LINE;
    validate->drivers = NULL;
    validate->next = NULL;
    return validate;
}

void start_race(struct series *series) {
    char check_name[MAX_SIZE];
    scan_name(check_name);

    if (series->races == NULL) {
        return;
    }
    struct race *curr = series->races;
    while (curr != NULL && strcmp(curr->name, check_name) != 0) {
        curr = curr->next;
    }
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
    curr->drivers = NULL;
    struct track_piece *temp = curr->track;
    struct track_piece *prev = temp;

    while (temp != NULL) {
        prev = temp;
        temp = temp->next;
    }
    struct track_piece *tail = create_FINISH_LINE();
    tail->next = prev->next;
    prev->next = tail;

    printf("Race %s started!\n", check_name);

    return;
}

// Stage 3.2
// remove a driver from all races in the series
void remove_driver_from_series(struct series *series) {
    char driver_name[MAX_SIZE];
    scan_name(driver_name);

    int found = 0;
    struct race *curr = series->races;
    while (curr != NULL) {
        if (curr->status == ACTIVE) {
            found += remove_named_from_track(curr->track, driver_name);
        } else {
            found += remove_named_from_list(&curr->drivers, driver_name);
        }
        curr = curr->next;
    }

    if (found == 0) {
        printf("ERROR: Driver %s not found in the series.\n", driver_name);
        return;
    }
    printf("Driver %s removed from the racing series!\n", driver_name);
}

// Stage 3.3
// move a driver from one not started race to another
void move_driver_between_races(struct series *series) {
    char driver_name[MAX_SIZE];
    char current_race_name[MAX_SIZE];
    char new_race_name[MAX_SIZE];
    scan_name(driver_name);
    scan_name(current_race_name);
    scan_name(new_race_name);

    struct race *current_race = find_race(series, current_race_name);
    if (current_race == NULL) {
        printf("ERROR: No race with name %s.\n", current_race_name);
        return;
    }
    if (current_race->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", current_race_name);
        return;
    }

    struct driver *target = current_race->drivers;
    while (target != NULL && strcmp(target->name, driver_name) != 0) {
        target = target->next;
    }
    if (target == NULL) {
        printf("ERROR: Driver %s not found in race %s.\n",
            driver_name, current_race_name);
        return;
    }

    struct race *new_race = find_race(series, new_race_name);
    if (new_race == NULL) {
        printf("ERROR: No race with name %s.\n", new_race_name);
        return;
    }
    if (new_race->status != NOT_STARTED) {
        printf("ERROR: Race %s has already started.\n", new_race_name);
        return;
    }

    struct driver *curr = new_race->drivers;
    while (curr != NULL) {
        if (strcmp(curr->name, driver_name) == 0) {
            printf("ERROR: Driver %s already in race %s.\n",
                driver_name, new_race_name);
            return;
        }
        curr = curr->next;
    }
    if (count_drivers(new_race->drivers) >= 8) {
        printf("ERROR: Race %s already at maximum driver limit.\n",
            new_race_name);
        return;
    }

    struct driver *removed = NULL;
    current_race->drivers = detach_driver(
        current_race->drivers, target, &removed
    );
    new_race->drivers = append_driver(new_race->drivers, removed);
}

// Stage 3.4
// play a given number of turns in an active race
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

    int i = 0;
    while (i < turns) {
        run_one_turn(race);
        if (race_finished(race)) {
            finish_race(race);
            return;
        }
        i++;
    }
}

// Stage 3.5
// keep playing turns until the race finishes
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

    while (race_finished(race) == 0) {
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
        free_drivers(head->drivers);
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

// helper functions for stage 3
struct race *find_race(struct series *series, char name[MAX_SIZE]) {
    struct race *curr = series->races;
    while (curr != NULL) {
        if (strcmp(curr->name, name) == 0) {
            return curr;
        }
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
    if (head == NULL) {
        return node;
    }
    struct driver *curr = head;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = node;
    return head;
}

struct driver *detach_driver(struct driver *head, struct driver *target,
    struct driver **removed) {
    struct driver *curr = head;
    struct driver *prev = NULL;

    while (curr != NULL) {
        if (curr == target) {
            if (prev == NULL) {
                head = curr->next;
            } else {
                prev->next = curr->next;
            }
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
        pieces[i] = track;
        i++;
        track = track->next;
    }
}

void collect_active_order(struct track_piece *track,
    struct driver *drivers[MAX_SIZE], int places[MAX_SIZE], int *count) {
    struct track_piece *pieces[MAX_SIZE];
    int piece_count = track_len(track);
    fill_track_array(track, pieces);

    *count = 0;
    int place = 1;
    int i = piece_count - 1;
    while (i >= 0) {
        struct driver *curr = pieces[i]->drivers;
        while (curr != NULL && *count < MAX_SIZE) {
            drivers[*count] = curr;
            places[*count] = place;
            (*count)++;
            place++;
            curr = curr->next;
        }
        i--;
    }
}

int track_has_piece_drivers(struct track_piece *track) {
    while (track != NULL) {
        if (track->drivers != NULL) {
            return 1;
        }
        track = track->next;
    }
    return 0;
}

void print_active_track(struct track_piece *track) {
    struct driver *drivers[MAX_SIZE];
    int places[MAX_SIZE];
    int count = 0;
    collect_active_order(track, drivers, places, &count);

    while (track != NULL) {
        printf("        %s\n", type_to_string(track->type));
        struct driver *curr = track->drivers;
        while (curr != NULL) {
            int i = 0;
            while (i < count) {
                if (drivers[i] == curr) {
                    printf("        %d. %s\n", places[i], curr->name);
                    break;
                }
                i++;
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
    struct driver *drivers[MAX_SIZE];
    int places[MAX_SIZE];
    int count = 0;
    collect_active_order(track, drivers, places, &count);

    if (count == 0) {
        printf("            Empty Driver List!\n");
        return;
    }

    int i = 0;
    while (i < count) {
        printf("            %d. %s (speed: %d)\n",
            places[i], drivers[i]->name, drivers[i]->speed);
        i++;
    }
}

void run_one_turn(struct race *race) {
    struct track_piece *pieces[MAX_SIZE];
    struct driver *order[MAX_SIZE];
    int source[MAX_SIZE];
    int piece_count = track_len(race->track);
    fill_track_array(race->track, pieces);

    int count = 0;
    int i = piece_count - 1;
    while (i >= 0) {
        if (pieces[i]->type == FINISH_LINE) {
            i--;
            continue;
        }
        struct driver *curr = pieces[i]->drivers;
        while (curr != NULL && count < MAX_SIZE) {
            order[count] = curr;
            source[count] = i;
            count++;
            curr = curr->next;
        }
        i--;
    }

    i = 0;
    while (i < count) {
        struct driver *moved = NULL;
        pieces[source[i]]->drivers = detach_driver(
            pieces[source[i]]->drivers, order[i], &moved
        );
        if (moved != NULL) {
            int dest = source[i] + moved->speed;
            if (dest >= piece_count) {
                dest = piece_count - 1;
            }
            pieces[dest]->drivers = append_driver(pieces[dest]->drivers, moved);
        }
        i++;
    }
}

int race_finished(struct race *race) {
    struct track_piece *pieces[MAX_SIZE];
    int piece_count = track_len(race->track);
    fill_track_array(race->track, pieces);

    if (piece_count == 0 || pieces[piece_count - 1]->type != FINISH_LINE) {
        return 0;
    }

    int i = 0;
    while (i < piece_count - 1) {
        if (pieces[i]->drivers != NULL) {
            return 0;
        }
        i++;
    }

    if (pieces[piece_count - 1]->drivers != NULL) {
        return 1;
    }
    return 0;
}

void finish_race(struct race *race) {
    struct track_piece *finish = race->track;
    while (finish->next != NULL) {
        finish = finish->next;
    }

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

///////////////////////////////////////////////////////////////////////////////
// Provided function definitions
////////////////////////////////////////////////////////////////////////////////

// Function to print the program usage information
// Params: None
// Returns: None
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

// Function to print the welcome banner
// Params: None
// Returns: None
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

// Helper function to print out the track information
// PARAMS:
//      track - the first track piece in a given race
// RETURNS: None
void print_track(struct track_piece *track) {

    if (track == NULL) {
        printf("        Empty Track!\n");
        return;
    }
    if (track_has_piece_drivers(track) == 1) {
        print_active_track(track);
        return;
    }
    while (track->next != NULL) {
        printf("        %s\n", type_to_string(track->type));
        printf("        |\n");
        printf("        ⌄\n");
        track = track->next;
    }
    printf("        %s\n", type_to_string(track->type));
    
}

// Helper function to print out the drivers within a race
// PARAMS:
//      race - the race containing the drivers to be printed
// RETURNS: None
void print_drivers(struct race *race) {

    printf("        Drivers:\n");

    if (race->status == ACTIVE) {
        print_active_leaderboard(race->track);
        return;
    }

    struct driver *current = race->drivers;
    if (current == NULL) {
        printf("            Empty Driver List!\n");
    }

    int count = 1;
    while (current != NULL) {
        printf("            %d. %s (speed: %d)\n", 
               count, current->name, current->speed);
        count++;
        current = current->next;
    }

}

// Scan in the a name string into the provided buffer, placing
// '\0' at the end.
//
// Params:
//      name - a char array of length MAX_SIZE, which will be used
//                  to store the name.
// Returns: None
// Usage:
// ```
//      char name[MAX_SIZE];
//      scan_name(name);
// ```
void scan_name(char name[MAX_SIZE]) {
    scan_token(name, MAX_SIZE);
}

// Scans a string and converts it to a location.
//
// Returns:
//      The corresponding location, if the string was valid,
//      Otherwise, returns INVALID.
//
// Usage:
// ```
//      enum location location = scan_location();
// ```
//
enum location scan_location(void) {
    char type[MAX_SIZE];
    scan_token(type, MAX_SIZE);
    return string_to_location(type);
}

// Scans a string and converts it to a location.
//
// Returns:
//      The corresponding pieve_type, if the string was valid,
//      Otherwise, returns INVALID.
//
// Usage:
// ```
//      enum piece_type type = scan_location();
// ```
//
enum piece_type scan_piece_type(void) {
    char type[MAX_SIZE];
    scan_token(type, MAX_SIZE);
    return string_to_type(type);
}

////////////////////////////////////////////////////////////////////////////////
// Additional provided function definitions
////////////////////////////////////////////////////////////////////////////////

// You don't need to use any of these, or understand how they work!
// We use them to implement some of the provided helper functions.

enum points place_to_points(int place) {
    if (place == 1) {
        return FIRST;
    }
    if (place == 2) {
        return SECOND;
    }
    if (place == 3) {
        return THIRD;
    }
    if (place == 4) {
        return FOURTH;
    }
    if (place == 5) {
        return FIFTH;
    }
    if (place == 6) {
        return SIXTH;
    }
    if (place == 7) {
        return SEVENTH;
    } else {
        return EIGHTH;
    }
}

enum location string_to_location(char *type_str) {
    int len = strlen(type_str);

    if (strncasecmp(type_str, "ALBERT_PARK", len) == 0) {
        return ALBERT_PARK;
    }
    if (strncasecmp(type_str, "MARINA_BAY", len) == 0) {
        return MARINA_BAY;
    }
    if (strncasecmp(type_str, "MONZA", len) == 0) {
        return MONZA;
    }
    if (strncasecmp(type_str, "SUZUKA", len) == 0) {
        return SUZUKA;
    } else {
        return ZANDVOORT;
    }
}

char *location_to_string(enum location location) {

    if (location == ALBERT_PARK) {
        return "ALBERT_PARK";
    }
    if (location == MARINA_BAY) {
        return "MARINA_BAY";
    }
    if (location == MONZA) {
        return "MONZA";
    }
    if (location == SUZUKA) {
        return "SUZUKA";
    } else  {
        return "ZANDVOORT";
    }

}
enum piece_type string_to_type(char *type_str) {
    int len = strlen(type_str);

    if (strncasecmp(type_str, "START_LINE", len) == 0) {
        return START_LINE;
    }
    if (strncasecmp(type_str, "FINISH_LINE", len) == 0) {
        return FINISH_LINE;
    }
    if (strncasecmp(type_str, "STRAIGHT", len) == 0) {
        return STRAIGHT;
    }
    if (strncasecmp(type_str, "LEFT_TURN", len) == 0) {
        return LEFT_TURN;
    }
    if (strncasecmp(type_str, "RIGHT_TURN", len) == 0) {
        return RIGHT_TURN;
    }
    if (strncasecmp(type_str, "JUMP", len) == 0) {
        return JUMP;
    }
    if (strncasecmp(type_str, "MYSTERY_BOX", len) == 0) {
        return MYSTERY_BOX;
    }

    return INVALID;
}

char *type_to_string(enum piece_type type) {
    if (type == START_LINE) {
        return "START_LINE";
    }
    if (type == FINISH_LINE) {
        return "FINISH_LINE";
    }
    if (type == STRAIGHT) {
        return "STRAIGHT";
    }
    if (type == LEFT_TURN) {
        return "LEFT_TURN";
    }
    if (type == RIGHT_TURN) {
        return "RIGHT_TURN";
    }
    if (type == JUMP) {
        return "JUMP";
    }
    if (type == MYSTERY_BOX) {
        return "MYSTERY_BOX";
    }
    return "INVALID";
}

char *status_to_string(enum race_status status) {
    
    if (status == NOT_STARTED) {
        return "NOT_STARTED";
    } else if (status == ACTIVE) {
        return "ACTIVE";
    } else {
        return "COMPLETED";
    }

}

int scan_token(char *buffer, int buffer_size) {
    if (buffer_size == 0) {
        return 0;
    }

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
