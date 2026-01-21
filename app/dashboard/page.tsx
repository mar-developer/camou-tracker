'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/user-avatar';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Badge } from '@/components/ui/badge';
import { Calendar, Flame, Target, Trophy, Users, Zap } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar username="demo_user" size={40} />
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="text-sm text-muted-foreground">Let's crush your habits today</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Users className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Trophy className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total XP</CardDescription>
              <CardTitle className="text-3xl">2,450</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Level 12</span>
              </div>
              <ProgressBar value={2450} max={2900} showLabel size="sm" />
              <p className="mt-2 text-xs text-muted-foreground">450 XP to next level</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Current Streak</CardDescription>
              <CardTitle className="text-3xl">14 days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>Best: 30 days</span>
              </div>
              <ProgressBar value={14} max={30} showLabel size="sm" color="#f97316" />
              <p className="mt-2 text-xs text-muted-foreground">Keep it going!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Today's Progress</CardDescription>
              <CardTitle className="text-3xl">5/8</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressBar value={5} max={8} showLabel size="sm" />
              <p className="mt-2 text-xs text-muted-foreground">3 habits remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly Goal</CardDescription>
              <CardTitle className="text-3xl">78%</CardTitle>
            </CardHeader>
            <CardContent>
              <ProgressBar value={78} max={100} showLabel size="sm" color="#22c55e" />
              <p className="mt-2 text-xs text-muted-foreground">Great progress!</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today's Habits</CardTitle>
                    <CardDescription>January 21, 2026</CardDescription>
                  </div>
                  <Button>Add Habit</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Morning meditation', streak: 14, done: true, category: 'Mindfulness' },
                    { name: 'Exercise 30 min', streak: 14, done: true, category: 'Fitness' },
                    { name: 'Read for 20 min', streak: 7, done: false, category: 'Learning' },
                    { name: 'Drink 8 glasses of water', streak: 21, done: false, category: 'Health' },
                    { name: 'Code for 1 hour', streak: 30, done: false, category: 'Work' },
                  ].map((habit, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between rounded-lg border p-4 transition-colors ${
                        habit.done ? 'bg-primary/10 border-primary/20' : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={habit.done}
                          className="h-5 w-5 rounded border-input"
                        />
                        <div>
                          <p className="font-medium">{habit.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span>{habit.streak} day streak</span>
                            <Badge variant="outline" size="sm">{habit.category}</Badge>
                          </div>
                        </div>
                      </div>
                      {habit.done && <Badge variant="success">Done!</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-semibold">7-Day Streak Challenge</p>
                      <p className="text-sm text-muted-foreground">Complete 3+ habits daily</p>
                    </div>
                  </div>
                  <ProgressBar value={5} max={7} showLabel />
                  <p className="text-sm text-muted-foreground">5/7 days • 2 days left</p>
                  <Button className="w-full">View Challenge</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '2:00 PM', habit: 'Read for 20 min' },
                    { time: '5:00 PM', habit: 'Exercise 30 min' },
                    { time: '9:00 PM', habit: 'Code for 1 hour' },
                  ].map((reminder, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{reminder.habit}</p>
                        <p className="text-xs text-muted-foreground">{reminder.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'On Fire', rarity: 'common', icon: '🔥' },
                    { name: 'Weekend Warrior', rarity: 'rare', icon: '💎' },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <Badge variant="outline" size="sm">{achievement.rarity}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
