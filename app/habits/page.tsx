'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Plus, Filter, Search, Flame, TrendingUp } from 'lucide-react';

export default function HabitsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-bold">My Habits</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Habit
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search habits..."
              className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: 'Morning meditation',
              description: 'Start the day with 10 minutes of meditation',
              category: 'Mindfulness',
              streak: 14,
              goal: 30,
              lastCompleted: 'Today',
              xp: 140,
              frequency: 'Daily',
            },
            {
              name: 'Exercise 30 min',
              description: 'Get your body moving every day',
              category: 'Fitness',
              streak: 14,
              goal: 30,
              lastCompleted: 'Today',
              xp: 140,
              frequency: 'Daily',
            },
            {
              name: 'Read for 20 min',
              description: 'Learn something new every day',
              category: 'Learning',
              streak: 7,
              goal: 30,
              lastCompleted: 'Yesterday',
              xp: 70,
              frequency: 'Daily',
            },
            {
              name: 'Drink 8 glasses of water',
              description: 'Stay hydrated throughout the day',
              category: 'Health',
              streak: 21,
              goal: 30,
              lastCompleted: 'Today',
              xp: 210,
              frequency: 'Daily',
            },
            {
              name: 'Code for 1 hour',
              description: 'Build something amazing every day',
              category: 'Work',
              streak: 30,
              goal: 30,
              lastCompleted: 'Today',
              xp: 300,
              frequency: 'Daily',
            },
            {
              name: 'Journal before bed',
              description: 'Reflect on your day',
              category: 'Personal',
              streak: 5,
              goal: 30,
              lastCompleted: '2 days ago',
              xp: 50,
              frequency: 'Daily',
            },
          ].map((habit, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{habit.name}</CardTitle>
                      <Badge variant="outline" size="sm">{habit.category}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{habit.description}</p>
                  </div>
                  <Badge variant={habit.lastCompleted === 'Today' ? 'success' : 'secondary'}>
                    {habit.lastCompleted}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>{habit.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>{habit.xp} XP</span>
                    </div>
                  </div>

                  <ProgressBar value={habit.streak} max={habit.goal} showLabel size="sm" color="#f97316" />

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {habit.frequency} • Goal: {habit.goal} days
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button size="sm">Complete</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
