#!/usr/bin/env python3
import csv
import html
import json
import math
import re
import subprocess
import time
from pathlib import Path
from urllib.parse import quote, urljoin


BASE_URL = "https://www.coles.com.au"
OUTPUT_CSV = Path("coles_all_products_english_chinese.csv")
OUTPUT_MD = Path("coles_all_products_english_chinese.md")
FALLBACK_BUILD_ID = "20260519.2-dc6ca4a12a99dc741883de303f8dfa9ced7179b3"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 Chrome/125 Safari/537.36"
)

TOP_CATEGORIES = [
    "baby",
    "bakery",
    "big-pack-value",
    "chips-chocolates-snacks",
    "cleaning-laundry",
    "dairy-eggs-fridge",
    "deli",
    "dietary-world-foods",
    "down-down",
    "drinks",
    "frozen",
    "fruit-vegetables",
    "health-beauty",
    "home-garden",
    "meat-seafood",
    "pantry",
    "pet",
]

SKIP_CATEGORIES = {"liquorland", "tobacco", "deliver-more-range"}

TERM_TRANSLATIONS = {
    "coles": "Coles",
    "australian": "澳洲",
    "fresh": "新鲜",
    "organic": "有机",
    "free range": "散养",
    "whole": "整",
    "half": "半",
    "sliced": "切片",
    "shredded": "切丝",
    "grated": "磨碎",
    "diced": "切丁",
    "minced": "肉馅",
    "washed": "已清洗",
    "loose": "散装",
    "pack": "包",
    "each": "每个",
    "approx": "约",
    "apple": "苹果",
    "apples": "苹果",
    "banana": "香蕉",
    "bananas": "香蕉",
    "orange": "橙子",
    "oranges": "橙子",
    "mandarin": "橘子",
    "mandarins": "橘子",
    "grape": "葡萄",
    "grapes": "葡萄",
    "strawberry": "草莓",
    "strawberries": "草莓",
    "blueberry": "蓝莓",
    "blueberries": "蓝莓",
    "avocado": "牛油果",
    "avocados": "牛油果",
    "potato": "土豆",
    "potatoes": "土豆",
    "tomato": "番茄",
    "tomatoes": "番茄",
    "lettuce": "生菜",
    "carrot": "胡萝卜",
    "carrots": "胡萝卜",
    "onion": "洋葱",
    "onions": "洋葱",
    "broccoli": "西兰花",
    "cauliflower": "花椰菜",
    "pumpkin": "南瓜",
    "mushroom": "蘑菇",
    "mushrooms": "蘑菇",
    "coriander": "香菜",
    "parsley": "欧芹",
    "basil": "罗勒",
    "chicken": "鸡肉",
    "beef": "牛肉",
    "pork": "猪肉",
    "lamb": "羊肉",
    "turkey": "火鸡肉",
    "salmon": "三文鱼",
    "tuna": "金枪鱼",
    "prawns": "虾",
    "fish": "鱼",
    "seafood": "海鲜",
    "bacon": "培根",
    "ham": "火腿",
    "sausage": "香肠",
    "sausages": "香肠",
    "milk": "牛奶",
    "cheese": "奶酪",
    "yoghurt": "酸奶",
    "yogurt": "酸奶",
    "butter": "黄油",
    "cream": "奶油",
    "eggs": "鸡蛋",
    "egg": "鸡蛋",
    "bread": "面包",
    "rolls": "小面包",
    "wraps": "卷饼皮",
    "cake": "蛋糕",
    "cakes": "蛋糕",
    "muffins": "麦芬",
    "flour": "面粉",
    "sugar": "糖",
    "rice": "大米",
    "pasta": "意面",
    "noodles": "面条",
    "oil": "油",
    "sauce": "酱",
    "salt": "盐",
    "pepper": "胡椒",
    "chips": "薯片",
    "chocolate": "巧克力",
    "biscuits": "饼干",
    "crackers": "薄脆饼",
    "nuts": "坚果",
    "water": "水",
    "juice": "果汁",
    "coffee": "咖啡",
    "tea": "茶",
    "drink": "饮料",
    "drinks": "饮料",
    "frozen": "冷冻",
    "ice cream": "冰淇淋",
    "pizza": "披萨",
    "shampoo": "洗发水",
    "conditioner": "护发素",
    "soap": "肥皂",
    "toothpaste": "牙膏",
    "nappies": "尿布",
    "wipes": "湿巾",
    "dog": "狗",
    "cat": "猫",
    "food": "食品",
    "laundry": "洗衣",
    "cleaner": "清洁剂",
    "tissues": "纸巾",
    "toilet": "马桶/卫生间",
    "paper": "纸",
}


def fetch(url: str) -> str:
    cmd = [
        "curl",
        "-L",
        "--fail",
        "--silent",
        "--show-error",
        "--max-time",
        "30",
        "-A",
        USER_AGENT,
        url,
    ]
    return subprocess.check_output(cmd, text=True)


def get_build_id() -> str:
    try:
        page = fetch(f"{BASE_URL}/browse/fruit-vegetables?page=2")
    except subprocess.CalledProcessError:
        return FALLBACK_BUILD_ID
    match = re.search(r'"buildId":"([^"]+)"', page)
    return match.group(1) if match else FALLBACK_BUILD_ID


def fetch_category_json(build_id: str, category: str, page: int) -> dict:
    parts = [quote(part) for part in category.split("/")]
    path = "/".join(parts)
    slug_query = "&".join(f"slug={part}" for part in parts)
    url = f"{BASE_URL}/_next/data/{build_id}/browse/{path}.json?page={page}&{slug_query}"
    raw = fetch(url)
    return json.loads(raw).get("pageProps", {}).get("searchResults") or {}


def clean_text(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<[^>]*>", " ", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def extract_total(search_results: dict) -> int:
    return int(search_results.get("noOfResults") or 0)


def extract_next_data(page_html: str) -> dict:
    match = re.search(
        r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>',
        page_html,
        re.DOTALL,
    )
    if not match:
        return {}
    data = json.loads(html.unescape(match.group(1)))
    return data.get("props", {}).get("pageProps", {}).get("searchResults") or {}


def extract_products(search_results: dict) -> list[dict]:
    data = search_results
    if data:
        products = []
        for item in data.get("results", []):
            if item.get("_type") != "PRODUCT":
                continue
            name = clean_text(item.get("name", ""))
            brand = clean_text(item.get("brand", ""))
            size = clean_text(item.get("size", ""))
            product_id = str(item.get("id") or "")
            if not product_id or not name:
                continue
            slug = re.sub(r"[^a-z0-9]+", "-", f"{brand} {name} {size}".lower()).strip("-")
            products.append(
                {
                    "product_id": product_id,
                    "brand": brand,
                    "name": name,
                    "size": size,
                    "english_name": clean_text(" ".join(part for part in [brand, name, size] if part)),
                    "url": f"{BASE_URL}/product/{slug}-{product_id}",
                }
            )
        return products

    products = []
    return products


def discover_categories() -> list[str]:
    page = fetch(f"{BASE_URL}/browse")
    found = set(TOP_CATEGORIES)
    for path in re.findall(r"/browse/[^\"?#<]+", page):
        slug = path.removeprefix("/browse/").replace("\\", "").strip("/")
        if slug and "%5B" not in slug and slug.split("/")[0] not in SKIP_CATEGORIES:
            found.add(slug)
    return sorted(found, key=lambda item: (item.count("/"), item))


def translate_name(name: str) -> str:
    base = re.sub(r"\s*\|\s*", " ", name)
    base = re.sub(r"\b\d+(\.\d+)?\s?(kg|g|ml|l|pack|pk|each|ea)\b", "", base, flags=re.I)
    words = re.findall(r"[A-Za-z]+(?:'[A-Za-z]+)?", base.lower())
    pieces = []
    used = set()
    lower = base.lower()
    for phrase in sorted((key for key in TERM_TRANSLATIONS if " " in key), key=len, reverse=True):
        if phrase in lower:
            pieces.append(TERM_TRANSLATIONS[phrase])
            used.update(phrase.split())
    for word in words:
        if word in used:
            continue
        translated = TERM_TRANSLATIONS.get(word)
        if translated and translated not in pieces:
            pieces.append(translated)
    if not pieces:
        return ""
    return "".join(pieces)


def main() -> None:
    categories = discover_categories()
    build_id = get_build_id()
    print(f"Using Coles buildId {build_id}", flush=True)
    products_by_id = {}
    for index, category in enumerate(categories, start=1):
        try:
            first_data = fetch_category_json(build_id, category, 1)
        except (subprocess.CalledProcessError, json.JSONDecodeError) as error:
            print(f"[skip] {category}: {error}", flush=True)
            continue
        total = extract_total(first_data)
        page_count = max(1, math.ceil(total / 48)) if total else 1
        print(f"[{index}/{len(categories)}] {category}: {total or 'unknown'} results, {page_count} pages", flush=True)
        pages = [first_data]
        for page_num in range(2, page_count + 1):
            time.sleep(0.2)
            try:
                pages.append(fetch_category_json(build_id, category, page_num))
            except (subprocess.CalledProcessError, json.JSONDecodeError) as error:
                print(f"  [page skip] {category} page {page_num}: {error}", flush=True)
        for data in pages:
            for product in extract_products(data):
                entry = products_by_id.setdefault(
                    product["product_id"],
                    {
                        "product_id": product["product_id"],
                        "brand": product["brand"],
                        "name": product["name"],
                        "size": product["size"],
                        "english_name": product["english_name"],
                        "chinese_name": translate_name(product["english_name"]),
                        "url": product["url"],
                        "categories": set(),
                    },
                )
                entry["categories"].add(category)

    rows = []
    for entry in products_by_id.values():
        rows.append(
            {
                "product_id": entry["product_id"],
                "brand": entry["brand"],
                "name": entry["name"],
                "size": entry["size"],
                "english_name": entry["english_name"],
                "chinese_name": entry["chinese_name"],
                "categories": "; ".join(sorted(entry["categories"])),
                "url": entry["url"],
            }
        )
    rows.sort(key=lambda row: (row["categories"], row["english_name"]))

    with OUTPUT_CSV.open("w", newline="", encoding="utf-8-sig") as file:
        writer = csv.DictWriter(
            file,
            fieldnames=[
                "product_id",
                "brand",
                "name",
                "size",
                "english_name",
                "chinese_name",
                "categories",
                "url",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)

    with OUTPUT_MD.open("w", encoding="utf-8") as file:
        file.write("# Coles 商品中英文名清单\n\n")
        file.write(
            "说明：本清单从 Coles 官网 browse 分类页抓取，按商品 ID 去重。"
            "中文名由规则词典自动生成，适合初稿整理；品牌名、特殊口味和新品建议后续人工校对。\n\n"
        )
        file.write(f"- 抓取商品数：{len(rows)}\n")
        file.write(f"- 抓取分类数：{len(categories)}\n")
        file.write("- 未包含：酒类、烟草，以及需要账户/门店定位才显示的隐藏或地区限定商品。\n")
        file.write(f"- Coles Next.js buildId：{build_id}\n\n")
        file.write("| Product ID | Brand | Name | Size | English name | 中文名 | Categories | URL |\n")
        file.write("| --- | --- | --- | --- | --- | --- | --- | --- |\n")
        for row in rows:
            file.write(
                f"| {row['product_id']} | {row['brand']} | {row['name']} | {row['size']} | "
                f"{row['english_name']} | {row['chinese_name']} | "
                f"{row['categories']} | {row['url']} |\n"
            )

    print(f"Wrote {len(rows)} products to {OUTPUT_CSV} and {OUTPUT_MD}", flush=True)


if __name__ == "__main__":
    main()
