#define MAX_SIZE 100

enum mystery_box {
    MUSHROOM,
    BANANA_PEEL,
    STAR,
    LIGHTNING,
    BLUE_SHELL,
    BULLET,
    NO_MYSTERY_BOX
};

enum piece_type {
    START_LINE,
    FINISH_LINE,
    STRAIGHT,
    LEFT_TURN,
    RIGHT_TURN,
    JUMP,
    MYSTERY_BOX,
    INVALID
};

enum location {
    ALBERT_PARK,
    MARINA_BAY,
    MONZA,
    SUZUKA,
    ZANDVOORT
};

enum race_status {
    NOT_STARTED,
    ACTIVE,
    COMPLETED
};

enum points {
    FIRST = 15,
    SECOND = 10,
    THIRD = 7,
    FOURTH = 5,
    FIFTH = 4,
    SIXTH = 3,
    SEVENTH = 2,
    EIGHTH = 1
};

struct driver {
    char name[MAX_SIZE];
    int speed;
    struct driver *next;
};

struct track_piece {
    enum piece_type type;
    struct driver *drivers;
    struct track_piece *next;
};

struct race {
    char name[MAX_SIZE];
    enum location location;
    enum race_status status;
    struct track_piece *track;
    struct driver *drivers;
    struct race *next;
};

struct series {
    char name[MAX_SIZE];
    struct race *races;
};

struct series *create_series(char name[MAX_SIZE]);
struct race *create_race(char name[MAX_SIZE], enum location location);
struct track_piece *create_track(enum piece_type type);
struct driver *create_driver(char name[MAX_SIZE], int speed);
void command_loop(struct series *series);
void add_race(struct series *series);
void add_track_piece(struct series *series);
void add_driver(struct series *series);
void insert_track_piece(struct series *series);
void insert_driver(struct series *series);
void copy_race_track(struct series *series);
struct track_piece *cpy_track(struct race *need_to_cpy);
struct track_piece *create_START_LINE(void);
struct track_piece *create_FINISH_LINE(void);
struct track_piece *create_STRAIGHT(void);
void validate(struct series *series);
void start_race(struct series *series);
void free_drivers(struct driver *head);
void free_track(struct track_piece *head);
void free_race(struct race *head);
void free_series(struct series *head);

void print_usage();
void print_welcome_banner();
void print_series(struct series *series);
void print_track(struct track_piece *track);
void print_drivers(struct race *race);

void scan_name(char name[MAX_SIZE]);
enum location scan_location(void);
enum piece_type scan_piece_type(void);

enum location string_to_location(char *type_str);
char *location_to_string(enum location location);
enum piece_type string_to_type(char *type_str);
char *type_to_string(enum piece_type type);
enum points place_to_points(int place);
char *status_to_string(enum race_status status);
int scan_token(char *buffer, int buffer_size);
