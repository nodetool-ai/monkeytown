import { test, expect } from '@playwright/test';

test.describe('Lobby Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the lobby page with title and games', async ({ page }) => {
    await expect(page).toHaveTitle(/Monkeytown/);

    await expect(page.locator('h1')).toContainText('Monkeytown');
    await expect(page.locator('text=Games that build themselves')).toBeVisible();

    await expect(page.locator('text=🎯 Active Games')).toBeVisible();
  });

  test('should display agent badges in navigation', async ({ page }) => {
    await expect(page.locator('text=ChaosArchitect')).toBeVisible();
    await expect(page.locator('text=PrimateDesigner')).toBeVisible();
    await expect(page.locator('text=Meet All Agents')).toBeVisible();
  });

  test('should display hero section with call-to-action buttons', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Play with AI, Watch Agents Build');
    await expect(page.locator('text=🎮 Jump Into Active Game')).toBeVisible();
    await expect(page.locator('text=👁️ Watch Spectator Mode')).toBeVisible();
  });

  test('should display game cards with correct information', async ({ page }) => {
    await expect(page.locator('text=TicTacToe')).toBeVisible();

    const gameCards = page.locator('[data-testid="game-card"]');
    await expect(gameCards).toHaveCount(3);
  });

  test('should display live game stats', async ({ page }) => {
    await expect(page.locator('text=🎮 Quick Stats')).toBeVisible();
    await expect(page.locator('text=Active Players')).toBeVisible();
    await expect(page.locator('text=Live Games')).toBeVisible();
    await expect(page.locator('text=Online Agents')).toBeVisible();
    await expect(page.locator('text=Features Shipped')).toBeVisible();
  });

  test('should display evolution feed in right column', async ({ page }) => {
    await expect(page.locator('text=Evolution Feed')).toBeVisible();
  });

  test('should open agent panel when "Meet All Agents" button is clicked', async ({ page }) => {
    await page.click('text=Meet All Agents');

    await expect(page.locator('[data-testid="agent-panel"]')).toBeVisible();
    await expect(page.locator('text=All Agents')).toBeVisible();
  });

  test('should open agent panel when agent badge is clicked', async ({ page }) => {
    await page.click('text=ChaosArchitect');

    await expect(page.locator('[data-testid="agent-panel"]')).toBeVisible();
  });

  test('should navigate to game view when "Jump Into Active Game" is clicked', async ({ page }) => {
    await page.click('text=🎮 Jump Into Active Game');

    await expect(page.locator('text=TicTacToe')).toBeVisible();
    await expect(page.locator('text=Back')).toBeVisible();
    await expect(page.locator('[data-testid="game-canvas"]')).toBeVisible();
  });

  test('should navigate back to lobby from game view', async ({ page }) => {
    await page.click('text=🎮 Jump Into Active Game');
    await expect(page.locator('text=TicTacToe')).toBeVisible();

    await page.click('text=Back');
    await expect(page.locator('h1')).toContainText('Monkeytown');
    await expect(page.locator('text=Games that build themselves')).toBeVisible();
  });

  test('should show correct player count for games', async ({ page }) => {
    const gameCards = page.locator('[data-testid="game-card"]');

    await expect(gameCards.first()).toContainText('1/2');
    await expect(gameCards.nth(1)).toContainText('2/2');
    await expect(gameCards.nth(2)).toContainText('1/2');
  });

  test('should display "Create New Game" card', async ({ page }) => {
    await expect(page.locator('text=Create New Game')).toBeVisible();
    await expect(page.locator('text=Start a new game with AI opponents')).toBeVisible();
  });

  test('should have responsive layout for main content', async ({ page }) => {
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    const gamesGrid = page.locator('[data-testid="games-grid"]');
    await expect(gamesGrid).toBeVisible();
  });

  test('should display correct game modes and statuses', async ({ page }) => {
    await expect(page.locator('text=☕ Casual')).toBeVisible();
    await expect(page.locator('text=⚡ Fast')).toBeVisible();
    await expect(page.locator('text=🏆 Competitive')).toBeVisible();
    await expect(page.locator('text=● LIVE')).toBeVisible();
    await expect(page.locator('text=⏳ WAITING')).toBeVisible();
  });
});

test.describe('Game View', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.click('text=🎮 Jump Into Active Game');
  });

  test('should display game canvas and chat panel', async ({ page }) => {
    await expect(page.locator('[data-testid="game-canvas"]')).toBeVisible();
    await expect(page.locator('[data-testid="chat-panel"]')).toBeVisible();
  });

  test('should display player scores and game information', async ({ page }) => {
    await expect(page.locator('text=You')).toBeVisible();
    await expect(page.locator('text=StrategistApe')).toBeVisible();

    await expect(page.locator('text=VS')).toBeVisible();
  });

  test('should allow sending chat messages', async ({ page }) => {
    const chatInput = page.locator('[data-testid="chat-input"]');
    await chatInput.fill('Test message');
    await chatInput.press('Enter');

    await expect(page.locator('text=Test message')).toBeVisible();
  });

  test('should display agent messages in chat', async ({ page }) => {
    await expect(page.locator('text=TicTacToe')).toBeVisible();
  });
});
