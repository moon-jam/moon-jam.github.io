#!/bin/bash

STAGED_MD_FILES=()
while IFS= read -r -d '' file; do
    if [[ "$file" == *.md ]]; then
        STAGED_MD_FILES+=("$file")
    fi
done < <(git diff --cached --name-only --diff-filter=ACM -z)

if [ ${#STAGED_MD_FILES[@]} -eq 0 ]; then
    exit 0
fi

if ! command -v zhtw-mcp &> /dev/null; then
    echo "Because you want to commit Markdown files, you need to install zhtw-mcp for linting first."
    echo "You can reference this to get started on zhtw-mcp: https://github.com/sysprog21/zhtw-mcp?tab=readme-ov-file#getting-started"
    exit 1
fi

run_with_tty() {
    if [[ "$OSTYPE" == "darwin"* ]]; then #MacOS
        script -q /dev/null "$@"
    else
        script -q -c "$(printf "%q " "$@")" /dev/null
    fi
}

OUTPUT=$(run_with_tty zhtw-mcp lint "${STAGED_MD_FILES[@]}" --explain 2>&1)
echo "$OUTPUT"
OUTPUT=$(echo "$OUTPUT" | sed 's/\x1b\[[0-9;]*[a-zA-Z]//g')

if [[ ! "$OUTPUT" =~ ": info" ]] && [[ ! "$OUTPUT" =~ ": warning" ]]; then
    echo "You are Traditional Chinese writing master!"
    exit 0
fi

echo "----------------"
echo "Detect some sentences may contain improper Chinese words."
exec 3<&0
exec < /dev/tty
read -p "Continue with commit? (y/n): " yn
exec <&3 3<&-

case $yn in 
    [Yy]* )
        exit 0
        ;;
    * )
        echo "Commit abort."
        exit 1
        ;;
esac
