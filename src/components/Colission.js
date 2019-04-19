export function hasPiece(symbol) {
    if (symbol === 0 || symbol === "0") {
        return false;
    } else {
        return true;
    }
}

export function checkArmy(symbol) {
    if (hasPiece(symbol)) {
        if (symbol === symbol.toUpperCase()) {
            return "white";
        } else {
            return "black";
        }
    }
}
export function checkCheck(symbol) {
    switch (symbol) {
        case "K":
            // return "checkWhite";
            return true;

        case "k":
            //   return "checkBlack";
            return true;

        default:
            return false;
    }
}

export function path(path, layout, army) {
    const fullPath = path;
    const navigablePath = [];
    for (let i = 0; i < fullPath.length; i++) {
        const squareSymbol = layout[fullPath[i].x][fullPath[i].y];

        if (!hasPiece(squareSymbol)) {
            navigablePath.push({
                x: fullPath[i].x,
                y: fullPath[i].y,
                hasEnemy: false
            });
        } else {
            let squareArmy = checkArmy(squareSymbol);

            if (squareArmy !== army) {
                navigablePath.push({
                    x: fullPath[i].x,
                    y: fullPath[i].y,
                    hasEnemy: true,
                    hasKing: checkCheck(squareSymbol)
                });
                break;
            } else {
                break;
            }
        }
    }
    return navigablePath;
}

export function points(points, layout, army) {
    const allPoints = points;
    const navigablePoints = [];
    for (let i = 0; i < allPoints.length; i++) {
        const squareSymbol = layout[allPoints[i].x][allPoints[i].y];

        if (!hasPiece(squareSymbol)) {
            navigablePoints.push({
                x: allPoints[i].x,
                y: allPoints[i].y,
                hasEnemy: false
            });
        } else {
            let squareArmy = checkArmy(squareSymbol);

            if (squareArmy !== army) {
                navigablePoints.push({
                    x: allPoints[i].x,
                    y: allPoints[i].y,
                    hasEnemy: true,
                    hasKing: checkCheck(squareSymbol)
                });
            }
        }
    }

    return navigablePoints;
}

export function pawnCollision(path, layout, army) {
    const fullPath = path;
    const navigablePath = [];
    for (let i = 0; i < fullPath.length; i++) {
        const squareSymbol = layout[fullPath[i].x][fullPath[i].y];

        if (!hasPiece(squareSymbol)) {
            navigablePath.push({
                x: fullPath[i].x,
                y: fullPath[i].y,
                hasEnemy: false
            });
        }
        if (i === 0) {
            if (
                hasPiece(layout[fullPath[i].x][fullPath[i].y + 1]) &&
                fullPath[i].y + 1 < 8
            ) {
                const squareRightSymbol =
                    layout[fullPath[i].x][fullPath[i].y + 1];
                let squareRightArmy = checkArmy(squareRightSymbol);

                if (army !== squareRightArmy) {
                    navigablePath.push({
                        x: fullPath[i].x,
                        y: fullPath[i].y + 1,
                        hasEnemy: true,
                        hasKing: checkCheck(squareRightSymbol)
                    });
                }
            }
            if (
                layout[fullPath[i].x][fullPath[i].y - 1] !== 0 &&
                layout[fullPath[i].x][fullPath[i].y - 1] !== "0" &&
                fullPath[i].y - 1 >= 0
            ) {
                const squareLeftSymbol =
                    layout[fullPath[i].x][fullPath[i].y - 1];
                let squareLeftArmy = checkArmy(squareLeftSymbol);

                if (army !== squareLeftArmy) {
                    navigablePath.push({
                        x: fullPath[i].x,
                        y: fullPath[i].y - 1,
                        hasEnemy: true,
                        hasKing: checkCheck(squareLeftSymbol)
                    });
                }
            }
        }
        return navigablePath;
    }
}
